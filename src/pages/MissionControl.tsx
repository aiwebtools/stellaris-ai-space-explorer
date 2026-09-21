import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Activity, Orbit, Radio, Satellite, Gauge } from 'lucide-react';
import StarField from '@/components/StarField';
import MissionChat from '@/components/mission/MissionChat';
import FloatingToolsButton from '@/components/FloatingToolsButton';
import { useMissionThreads } from '@/hooks/useMissionThreads';
import missionOfficer from '@/assets/mission-officer.png';
import { INSITE_MISSION_LABEL } from '@/lib/toolLinks';

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
    <div className="mission-control-page min-h-screen bg-space-black text-foreground">
      <StarField />
      <div className="mission-orbit mission-orbit-one" aria-hidden="true" />
      <div className="mission-orbit mission-orbit-two" aria-hidden="true" />
      <div className="relative z-10 container mx-auto px-3 sm:px-5 py-4 lg:py-6">
        <div className="mission-topbar flex items-center justify-between mb-3 gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to base
          </Link>
          <div className="hidden md:flex items-center gap-5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-mission-green" /> Systems nominal</span>
            <span className="flex items-center gap-1.5"><Satellite className="w-3.5 h-3.5 text-space-cyan" /> Deep-space relay 07</span>
            <span>UTC 21:09:26</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={missionOfficer}
              alt="Stellaris mission guidance officer"
              loading="lazy"
              width={816}
              height={816}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-space-cyan/60 shadow-mission-glow"
            />
            <div className="text-right">
              <h1 className="text-sm sm:text-lg font-bold leading-tight uppercase tracking-[0.08em]">{INSITE_MISSION_LABEL}</h1>
              <p className="text-[10px] sm:text-xs text-mission-green flex items-center justify-end gap-1"><span className="mission-status-dot" /> Live AI flight guidance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Comms link', value: 'LOCKED', icon: Radio, tone: 'text-mission-green' },
            { label: 'Nav solution', value: '98.7%', icon: Orbit, tone: 'text-space-cyan' },
            { label: 'Signal', value: '-42 dB', icon: Activity, tone: 'text-space-purple' },
            { label: 'Guidance core', value: 'ONLINE', icon: Gauge, tone: 'text-mission-amber' },
          ].map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="mission-telemetry flex items-center gap-3 px-3 py-2.5">
              <Icon className={`w-4 h-4 ${tone}`} />
              <div className="min-w-0"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="text-xs font-semibold text-foreground tabular-nums">{value}</p></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] gap-3">
          {/* Thread list */}
          <aside className="mission-panel mission-corners p-3.5 h-fit lg:sticky lg:top-4">
            <div className="flex items-center justify-between mb-3 text-[9px] uppercase tracking-[0.16em] text-muted-foreground"><span>Mission archive</span><span className="text-mission-green">{threads.length.toString().padStart(2, '0')} records</span></div>
            <button
              onClick={handleNewThread}
              className="button-primary w-full flex items-center justify-center gap-2 py-2 text-sm mb-4 rounded-sm"
            >
              <Plus className="w-4 h-4" /> New mission
            </button>
            <div className="space-y-1 max-h-[40vh] lg:max-h-[60vh] overflow-y-auto">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  className={`group flex items-center gap-1 rounded-sm px-2 transition-colors border-l-2 ${
                    thread.id === threadId ? 'bg-space-blue/20 border-space-cyan' : 'border-transparent hover:bg-foreground/5'
                  }`}
                >
                  <button
                    onClick={() => navigate(`/mission-control/${thread.id}`)}
                    className="flex-1 text-left py-2 text-sm text-foreground truncate"
                  >
                    {thread.title}
                  </button>
                  <button
                    onClick={() => handleDelete(thread.id)}
                    aria-label="Delete conversation"
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-muted-foreground hover:text-destructive p-1 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 border-t border-border pt-3">
              Conversations are saved in this browser only.
            </p>
            <div className="mt-4 mission-radar" aria-hidden="true"><span /><i /><b /></div>
            <div className="flex justify-between text-[9px] uppercase tracking-[0.12em] text-muted-foreground mt-2"><span>Sector scan</span><span className="text-space-cyan">Clear</span></div>
          </aside>

          {/* Chat */}
          <main className="mission-panel mission-corners p-3 pb-16 sm:p-4 h-[calc(100vh-12rem)] min-h-[540px] max-h-[850px] flex flex-col relative overflow-hidden">
            <div className="mission-scanline" aria-hidden="true" />
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-[9px] uppercase tracking-[0.14em] text-muted-foreground relative z-10">
              <span>Encrypted guidance channel</span>
              <span className="flex items-center gap-1.5 text-mission-green"><span className="mission-status-dot" /> Transmission live</span>
            </div>
            {activeThread ? (
              <MissionChat
                key={activeThread.id}
                threadId={activeThread.id}
                initialMessages={activeThread.messages}
                onMessagesChange={updateMessages}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Preparing mission console...
              </div>
            )}
          </main>
        </div>
      </div>
      <FloatingToolsButton compact />
    </div>
  );
};

export default MissionControl;
