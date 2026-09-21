import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import StarField from '@/components/StarField';
import MissionChat from '@/components/mission/MissionChat';
import FloatingToolsButton from '@/components/FloatingToolsButton';
import { useMissionThreads } from '@/hooks/useMissionThreads';
import missionOfficer from '@/assets/mission-officer.png';

const MissionControl: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { threads, createThread, deleteThread, updateMessages, getThread } =
    useMissionThreads();

  const activeThread = getThread(threadId);

  useEffect(() => {
    document.title = 'Mission Control | Stellaris AI Space Explorer';
  }, []);

  // No thread in the URL (or an unknown one): land on the newest one.
  useEffect(() => {
    if (!threadId || (!activeThread && threads.length > 0)) {
      const target = threads[0];
      if (target) navigate(`/mission-control/${target.id}`, { replace: true });
    }
  }, [threadId, activeThread, threads, navigate]);

  const handleNewThread = () => {
    const thread = createThread();
    navigate(`/mission-control/${thread.id}`);
  };

  const handleDelete = (id: string) => {
    deleteThread(id);
    if (id === threadId) navigate('/mission-control', { replace: true });
  };

  return (
    <div className="min-h-screen bg-space-black text-white">
      <StarField />
      <div className="relative z-10 container mx-auto px-4 py-6 lg:py-10">
        <div className="flex items-center justify-between mb-6 gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to base
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={missionOfficer}
              alt="Stellaris mission guidance officer"
              loading="lazy"
              width={816}
              height={816}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-space-blue/60"
            />
            <div className="text-right">
              <h1 className="text-lg font-bold leading-tight">Stellaris Mission Control</h1>
              <p className="text-xs text-space-cyan">Live AI flight guidance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Thread list */}
          <aside className="glass-panel p-4 h-fit lg:sticky lg:top-6">
            <button
              onClick={handleNewThread}
              className="button-primary w-full flex items-center justify-center gap-2 py-2 text-sm mb-4"
            >
              <Plus className="w-4 h-4" /> New mission
            </button>
            <div className="space-y-1 max-h-[40vh] lg:max-h-[60vh] overflow-y-auto">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  className={`group flex items-center gap-1 rounded-lg px-2 transition-colors ${
                    thread.id === threadId ? 'bg-space-blue/20' : 'hover:bg-white/5'
                  }`}
                >
                  <button
                    onClick={() => navigate(`/mission-control/${thread.id}`)}
                    className="flex-1 text-left py-2 text-sm text-gray-200 truncate"
                  >
                    {thread.title}
                  </button>
                  <button
                    onClick={() => handleDelete(thread.id)}
                    aria-label="Delete conversation"
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-red-400 p-1 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-4">
              Conversations are saved in this browser only.
            </p>
          </aside>

          {/* Chat */}
          <main className="glass-panel p-4 h-[72vh] min-h-[520px] flex flex-col">
            {activeThread ? (
              <MissionChat
                key={activeThread.id}
                threadId={activeThread.id}
                initialMessages={activeThread.messages}
                onMessagesChange={updateMessages}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Preparing mission console...
              </div>
            )}
          </main>
        </div>
      </div>
      <FloatingToolsButton />
    </div>
  );
};

export default MissionControl;
