import React from 'react';
import { Link } from 'react-router-dom';
import { MessagesSquare } from 'lucide-react';
import MissionChat from './MissionChat';
import { useMissionThreads } from '@/hooks/useMissionThreads';
import missionOfficer from '@/assets/mission-officer.png';

const MissionConsoleSection: React.FC = () => {
  const { threads, updateMessages } = useMissionThreads();
  const thread = threads[0];

  return (
    <section id="mission-control" className="section-container">
      <h2 className="section-title text-center">Talk to Stellaris Mission Control</h2>
      <p className="section-subtitle text-center">
        Ask our on-site AI for live guidance on space missions, colony planning, fleet builds and
        galactic strategy — right here, no signup needed.
      </p>

      <div className="max-w-5xl mx-auto mt-10 mission-panel mission-corners p-4 sm:p-6 relative overflow-hidden">
        <div className="mission-scanline" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-3 pb-4 border-b border-border mb-4">
          <img
            src={missionOfficer}
            alt="Stellaris mission guidance officer"
            loading="lazy"
            width={816}
            height={816}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-space-cyan/60 shadow-mission-glow"
          />
          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-[0.08em]">Stellaris Flight Officer</h3>
            <p className="text-xs text-mission-green flex items-center gap-1.5"><span className="mission-status-dot" /> Online • mission guidance AI</p>
          </div>
          <Link
            to="/mission-control"
            className="ml-auto inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessagesSquare className="w-4 h-4" /> Open full console
          </Link>
        </div>

        <div className="h-[520px] flex flex-col relative z-10">
          {thread && (
            <MissionChat
              key={thread.id}
              threadId={thread.id}
              initialMessages={thread.messages}
              onMessagesChange={updateMessages}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MissionConsoleSection;
