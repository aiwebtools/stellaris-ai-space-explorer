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
    });

    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }
    return new Response(response.body, { status: response.status, headers });
  } catch (error) {
    console.error("stellaris-chat error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
