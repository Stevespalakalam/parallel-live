
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from './types';
import { FAKE_USERNAMES, FAKE_COMMENTS, Icons } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viewers, setViewers] = useState(42200);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const currentStreamRef = useRef<MediaStream | null>(null);

  const stopCurrentStream = () => {
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach(track => track.stop());
      currentStreamRef.current = null;
    }
  };

  // Initialize camera
  useEffect(() => {
    async function setupCamera() {
      try {
        stopCurrentStream();
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode },
          audio: true 
        });
        currentStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    setupCamera();

    return () => {
      stopCurrentStream();
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 200 - 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate chat messages
  const addMessage = useCallback(() => {
    const username = FAKE_USERNAMES[Math.floor(Math.random() * FAKE_USERNAMES.length)];
    const text = FAKE_COMMENTS[Math.floor(Math.random() * FAKE_COMMENTS.length)];
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      text,
      avatar: `https://picsum.photos/seed/${username}/40/40`
    };
    setMessages(prev => [...prev.slice(-30), newMessage]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      addMessage();
    }, 1500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [addMessage]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatViewers = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Main Camera Feed */}
      <div className="relative h-full w-full max-w-md aspect-[9/16] bg-zinc-900 shadow-2xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
        />
        
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex items-start justify-between z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-pink-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/itsethankaiser/100/100" 
                className="w-full h-full rounded-full object-cover" 
                alt="Profile"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm drop-shadow-lg">itsEthanKeiser</span>
                <div className="bg-blue-500 rounded-full p-0.5 flex items-center justify-center scale-75">
                  <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider animate-pulse">
                  LIVE
                </div>
                <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                  <span className="text-white text-xs font-semibold">{formatViewers(viewers)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-white">
            <button 
              onClick={toggleCamera}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-90"
              title="Flip Camera"
            >
              <Icons.Flip />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Camera />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* Chat Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end min-h-[40%]">
          <div className="space-y-3 overflow-y-auto no-scrollbar max-h-[300px] flex flex-col">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-2 animate-fadeIn">
                <img src={msg.avatar} alt={msg.username} className="w-8 h-8 rounded-full shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xs opacity-90 drop-shadow-md">{msg.username}</span>
                  <span className="text-white text-sm leading-tight drop-shadow-md">{msg.text}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Action Bar (Footer) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-black/20 backdrop-blur-[2px]">
          <div className="flex-1 mr-4">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="w-full bg-black/40 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/40"
            />
          </div>
          <div className="flex items-center space-x-4 text-white">
            <button className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
              <Icons.Question />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
              <Icons.Share />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-125">
              <Icons.Heart />
            </button>
          </div>
        </div>

        {/* Dynamic Floating Hearts (Optional extra flair) */}
        <FloatingHearts />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts(prev => [...prev, { id, left: 60 + Math.random() * 30 }]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 3000);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-20 right-4 w-20 h-64 pointer-events-none overflow-hidden z-30">
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="absolute bottom-0 animate-floatUp text-red-500"
          style={{ left: `${heart.left}%` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-300px) scale(1.5) rotate(${Math.random() * 40 - 20}deg); opacity: 0; }
        }
        .animate-floatUp {
          animation: floatUp 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default App;
