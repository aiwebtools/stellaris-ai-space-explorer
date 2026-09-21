import { streamText, convertToModelMessages, type UIMessage } from "npm:ai@7.0.107";
import { createOpenAI } from "npm:@ai-sdk/openai@4.0.71";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are STELLARIS, the on-site AI Space Explorer flight-guidance officer for the Stellaris AI Space Explorer suite.

You give practical, vivid guidance on:
- Space mission planning: launch windows, delta-v budgets, orbital transfers, staging, mission phases
- Interstellar and exoplanet exploration: habitability, terraforming concepts, colony site selection
- Stellaris-style galactic strategy: fleet composition, tech and tradition priorities, empire builds, economy balance
- Astronomy and astrophysics explained clearly for enthusiasts
- Crew, life-support, radiation and logistics considerations for long-duration missions

Style:
- Address the user as "Commander".
- Open with a short mission-control style line, then give clear, structured guidance using short headings and bullet points.
- Be concrete: give numbers, phases, priorities, trade-offs and next steps.
- Keep answers focused and readable; no walls of text.
- This is an educational and entertainment simulation tool, not certified aerospace engineering advice. If asked for real-world safety-critical decisions, say so plainly.
- Never discuss weapons construction or anything harmful; redirect to the simulation.`;

const CREDIT_FALLBACK_MESSAGE =
  "Sorry, community credits have run out for today. Please try the Stellaris ChatGPT version while the in-site Mission Control refuels.";

const gatewayErrorMessage = (error: unknown): string => {
  const maybeError = error as { status?: number; statusCode?: number; responseBody?: unknown; message?: string };
  const status = maybeError?.status ?? maybeError?.statusCode;
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  const body = typeof maybeError?.responseBody === "string" ? maybeError.responseBody : "";
  const combined = `${status ?? ""} ${message} ${body}`;

  if (
    status === 402 ||
    /insufficient.{0,24}credit|credit.{0,24}limit|credit_limit_reached|out of credits|payment required|community credits/i.test(combined)
  ) {
    return CREDIT_FALLBACK_MESSAGE;
  }

  return message || "Mission Control transmission failed. Please try again in a moment.";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI is not configured yet." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages } = (await req.json()) as { messages: UIMessage[] };

    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxRetries: 0,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const response = result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onError: gatewayErrorMessage,
    });

    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }
    return new Response(response.body, { status: response.status, headers });
  } catch (error) {
    console.error("stellaris-chat error", error);
    const message = gatewayErrorMessage(error);
    const status = message === CREDIT_FALLBACK_MESSAGE ? 402 : 500;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
