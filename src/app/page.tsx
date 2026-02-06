"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface Heart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [yesScale, setYesScale] = useState(1);
  
  // NEW: Track if the card is flipped
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newHearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 20,
        duration: Math.random() * 3 + 2,
      }));
      setHearts(newHearts);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function handleNoClick() {
    setNoCount(noCount + 1);
    const growthRate = 0.30 + (noCount * 0.05);
    setYesScale(prevScale => prevScale + growthRate);
  }

  function handleYesClick() {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000']
    });
  }

  // NEW: Reset everything to start over
  function handleReset() {
    setIsFlipped(false);
    setYesPressed(false);
    setNoCount(0);
    setYesScale(1);
  }

  const noButtonOffset = (yesScale - 1) * 80;

  // ---------------------------------------------------------
  // VIEW 1: SUCCESS
  // ---------------------------------------------------------
  if (yesPressed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-pink-200 via-red-100 to-pink-300 p-8 text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
        
        {hearts.map((heart) => (
           <div
             key={heart.id}
             className="absolute bottom-0 text-pink-300 opacity-30 animate-pulse"
             style={{
               left: `${heart.left}%`,
               animationDelay: `${heart.delay}s`,
               fontSize: `${heart.size}px`
             }}
           >
             ❤️
           </div>
        ))}

        <h1 className="text-6xl font-bold mb-4 drop-shadow-sm animate-pulse py-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-red-500">
            Yeeeeeeyy!!!
          </span>
          <span> 💖</span> 
        </h1>
        
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-500 mb-8 z-10 drop-shadow-sm py-2">
          Thank you, babyyyy. I love you so muchhh :3
        </h2>

        {/* 3D FLIP CONTAINER */}
        <div className="relative w-full max-w-lg cursor-pointer [perspective:1000px] z-10" onClick={() => setIsFlipped(!isFlipped)}>
          
          {/* FLIPPER */}
          <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
            
            {/* FRONT FACE (Letter) */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-pink-200 [backface-visibility:hidden]">
              <p className="text-gray-700 text-lg leading-relaxed text-left font-medium">
                Dear <strong>Ashley Silva My Baby</strong>,
                <br /><br />
                This is our 2nd Valentine&apos;s na baby and I&apos;m so glad na we&apos;re still going strong japun hehe. 
                I hope this would be a good year and I really want to be with you najud :( 
                Pero 3 months nalang man sad so laban HAHAHAHA. 
                <br /><br />
                I love you so much my cutie baby, my sweetie pie honey bunch sugarplum humpty humpty dum {'>'}-{'<'}
              </p>
              
              <div className="mt-8 pt-6 border-t border-pink-100 text-left">
                <p className="font-bold text-pink-500">From the love of your life</p>
                <p className="text-gray-500">- Remor Silva Jr (Your Baby)</p>
                <p className="text-xs text-pink-300 mt-4 italic text-center">(Click card to flip)</p>
              </div>
            </div>

            {/* BACK FACE (Reset Option) */}
            <div className="absolute inset-0 h-full w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-pink-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
              
              {/* Return Icon (Top Left) */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Stop the card from flipping back when clicking the icon
                  setIsFlipped(false);
                }}
                className="absolute top-4 left-4 p-2 text-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-full transition-colors"
                title="Flip back"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </button>

              <p className="text-xl font-bold text-pink-600 mb-6 text-center">
                Just in case ganahan ka mubalik sa first page hehe
              </p>

              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Stop bubble so we don't flip, just reset
                  handleReset();
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:scale-105 transition-all animate-bounce"
              >
                Go back to start 🔄
              </button>
            </div>

          </div>
        </div>

      </main>
    );
  }

  // ---------------------------------------------------------
  // VIEW 2: PROPOSAL
  // ---------------------------------------------------------
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-100 p-4 overflow-hidden relative">
      
      {hearts.map((heart) => (
         <div
           key={heart.id}
           className="absolute bottom-0 text-pink-400 opacity-20 animate-bounce"
           style={{
             left: `${heart.left}%`,
             animationDuration: `${heart.duration}s`,
             fontSize: `${heart.size}px`,
             animationDelay: `${heart.delay}s`
           }}
         >
           ❤️
         </div>
      ))}

      <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-center drop-shadow-lg animate-pulse tracking-wide leading-tight z-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-500">
          Will you be my Valentine?
        </span> 
        <span className="text-red-500"> 🌹</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 z-10 w-full relative min-h-[100px]">
        
        {/* YES BUTTON */}
        <button
          onClick={handleYesClick}
          className="relative z-50 rounded bg-green-500 px-8 py-4 font-bold text-white hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:ring-4 ring-green-300 ring-offset-2"
          style={{ transform: `scale(${yesScale})` }}
        >
          YES
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 rounded animate-pulse"></span>
        </button>

        {/* NO BUTTON */}
        <button
          onClick={handleNoClick}
          className="rounded bg-red-500 px-8 py-4 font-bold text-white hover:bg-red-600 transition-all duration-300 shadow-lg whitespace-nowrap z-10"
          style={{ transform: `translateX(${noButtonOffset}px)` }}
        >
          {noCount === 0 ? "No" : "Are you sure? 😢"}
        </button>
      </div>

    </main>
  );
}