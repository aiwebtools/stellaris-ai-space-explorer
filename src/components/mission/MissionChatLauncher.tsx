import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Maximize2, Rocket } from 'lucide-react';
import MissionChat from './MissionChat';
import { useMissionThreads } from '@/hooks/useMissionThreads';
import missionOfficer from '@/assets/mission-officer.png';

const MissionChatLauncher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { threads, updateMessages } = useMissionThreads();
  const thread = threads[0];

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] max-h-[600px] glass-panel p-4 flex flex-col shadow-2xl">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <img
              src={missionOfficer}
              alt="Stellaris mission guidance officer"
              loading="lazy"
              width={816}
              height={816}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-space-blue/60"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Mission Control</p>
              <p className="text-[11px] text-space-cyan">AI space guidance</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Link
                to="/mission-control"
                aria-label="Open full console"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 pt-3 flex flex-col">
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
        aria-label="Ask Stellaris Mission Control"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-space-cyan to-space-purple shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Rocket className="w-6 h-6 text-white" />}
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-cyan to-space-purple opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
          {!isOpen && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              ASK MISSION CONTROL
            </div>
          )}
        </div>
      </button>
    </>
  );
};

export default MissionChatLauncher;
