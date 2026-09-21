import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Maximize2, Rocket } from 'lucide-react';
import MissionChat from './MissionChat';
import { useMissionThreads } from '@/hooks/useMissionThreads';
import missionOfficer from '@/assets/mission-officer.png';
import { INSITE_MISSION_LABEL } from '@/lib/toolLinks';

const MissionChatLauncher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { threads, updateMessages } = useMissionThreads();
  const thread = threads[0];

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[70vh] max-h-[620px] mission-panel mission-corners p-4 flex flex-col shadow-2xl overflow-hidden">
          <div className="mission-scanline" aria-hidden="true" />
          <div className="relative z-10 flex items-center gap-3 pb-3 border-b border-border">
            <img
              src={missionOfficer}
              alt="Stellaris mission guidance officer"
              loading="lazy"
              width={816}
              height={816}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-space-blue/60"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate uppercase tracking-[0.08em]">{INSITE_MISSION_LABEL}</p>
              <p className="text-[11px] text-mission-green flex items-center gap-1"><span className="mission-status-dot" /> AI guidance link active</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Link
                to="/mission-control"
                aria-label="Open full console"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative z-10 flex-1 min-h-0 pt-3 flex flex-col">
            {thread && (
              <MissionChat
                key={thread.id}
                threadId={thread.id}
                initialMessages={thread.messages}
                onMessagesChange={updateMessages}
                compact
              />
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Ask Stellaris Mission Control in-site version"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-space-cyan to-space-purple shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Rocket className="w-6 h-6 text-white" />}
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-cyan to-space-purple opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
          {!isOpen && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              ASK MISSION CONTROL (INSITE)
            </div>
          )}
        </div>
      </button>
    </>
  );
};

export default MissionChatLauncher;
