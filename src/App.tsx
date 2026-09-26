import { useState, useEffect, useRef } from 'react';
import myVideo from './assets/leeyihong_hero_video.mp4';

// const VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-loop-with-blue-lights-40244-large.mp4";


const useTypewriter = (text: string, speed = 38, startDelay = 600) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;
    timeoutId = window.setTimeout(() => {
      let i = 0;
      intervalId = window.setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
};

export default function App() {
  // const [isOpen, setIsOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number>(0);
  const targetTime = useRef<number>(0);
  const isSeeking = useRef<boolean>(false);

  const { displayed, done } = useTypewriter("Glad you stopped in. Good taste tends to find me. Now, what are we building?");

  useEffect(() => {
    setTimeout(() => setPillsVisible(true), 400);

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current || !videoRef.current.duration) return;
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;
      const duration = videoRef.current.duration;
      const SENSITIVITY = 0.8;
      let newTime = targetTime.current + (delta / window.innerWidth) * SENSITIVITY * duration;
      newTime = Math.max(0, Math.min(duration, newTime));
      targetTime.current = newTime;

      if (!isSeeking.current) {
        videoRef.current.currentTime = targetTime.current;
        isSeeking.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSeeked = () => {
    isSeeking.current = false;
    if (videoRef.current && Math.abs(videoRef.current.currentTime - targetTime.current) > 0.01) {
      videoRef.current.currentTime = targetTime.current;
      isSeeking.current = true;
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        onSeeked={handleSeeked}
        src={myVideo}//VIDEO_URL
        muted playsInline preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: '70% center' }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 w-full z-20 px-8 sm:px-12 md:px-16 py-6 sm:py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[25px] sm:text-[30px] select-none tracking-[-0.02em]">✳︎</span>
          <span className="text-[21px] sm:text-[26px] tracking-tight font-heading">Jessica Lee Yi Hong &reg;</span>
          <span className="text-[25px] sm:text-[30px] select-none tracking-[-0.02em]">✳︎</span>
        </div>


        {/* Navigation side (Hidden for now) */}
        {/*
        <div className="hidden md:flex items-center text-[20px] lg:text-[23px]">
          {["Labs", "Studio", "Openings", "Shop"].map((item, i) => (
            <React.Fragment key={item}>
              <a href="#" className="hover:opacity-60 transition-opacity">{item}</a>
              {i < 3 && <span>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </div>

        <a href="#" className="hidden md:block text-[20px] lg:text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity">
          Get in touch
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-[5px] z-20" aria-label="Toggle Menu">
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
        */}

      </nav>

      {/* MOBILE OVERLAY (Hidden for now) */}
      {/*
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-md z-10 flex flex-col justify-center px-8 sm:px-12 gap-8 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {["Labs", "Studio", "Openings", "Shop", "Get in touch"].map((item) => (
          <a key={item} href="#" className={`text-[32px] font-medium ${item === 'Get in touch' ? 'underline' : ''}`}>{item}</a>
        ))}
      </div>
      */}

      {/* HERO CONTENT */}
      <section className="relative z-10 h-screen flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20">
        <div className="max-w-xl">

          {/* 1. Blurred Intro Label */}
          <div className="mb-5 sm:mb-6 pointer-events-none select-none blur-[1px] text-white opacity-90" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.3 }}>
            Hey there, meet Jessica Lee! <br />
            Learn and Build with me using AI!
          </div>

          <p className="mb-5 sm:mb-6 min-h-[54px]" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35 }}>
            {displayed}
            {!done && <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />}
          </p>

          <div className={`flex flex-wrap gap-y-1 transition-all duration-500 ${pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <a
              href="https://g.dev/leeyihong"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors"
            >
              My Developer Profile
            </a>
            <a
              href="https://www.linkedin.com/in/leeyihong/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors"
            >
              Come work with me
            </a>
            <a
              href="https://www.paypal.com/paypalme/leeyihong"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors"
            >
              Buy me a Kopi (Coffee)
            </a>
            <a
              href="https://www.linkedin.com/in/leeyihong/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors"
            >
              See how I operate
            </a>
            <button
              onClick={() => { navigator.clipboard.writeText("yunotechai@gmail.com"); alert("Copied!"); }}
              className="bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              Reach me: <span className="underline">'MY FULL NAME'@gmail.com</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor"><path d="M8 2H2V8H8V2Z" /><path d="M10 4V10H4" /></svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}