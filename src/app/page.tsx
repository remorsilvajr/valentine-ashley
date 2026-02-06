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
  
  // NEW: Track the exact scale of the Yes button in state
  const [yesScale, setYesScale] = useState(1);

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
    
    // 1. INCREASE GROWTH RATE DYNAMICALLY
    // Start at 30% growth (0.3), add 5% (0.05) per click
    const growthRate = 0.30 + (noCount * 0.05);
    
    // 2. APPLY THE NEW SCALE
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

  // MOVEMENT LOGIC:
  // The Yes button expands from the center.
  // If it grows by scale X, its right edge moves by roughly (Scale - 1) * (Half Width).
  // We estimate the button's half-width is about 75px. 
  // We multiply by slightly more (80px) to keep a clean gap.
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

        <h1 className="text-6xl font-bold mb-4 drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-red-500 animate-pulse">
          Yeeeeeeyy!!! 💖
        </h1>
        
        <h2 className="text-2xl font-semibold text-pink-600 mb-8 z-10">
          Thank you, babyyyy. I love you so muchhh :3
        </h2>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-lg border-2 border-pink-200 z-10 transform hover:scale-105 transition-transform duration-300">
          <p className="text-gray-700 text-lg leading-relaxed text-left font-medium">
            Dear <strong>Ashley Silva My Baby</strong>,
            <br /><br />
            This is our 2nd Valentine&apos;s na baby and I&apos;m so glad na we&apos;re still going strong japun hehe. 
            I hope this would be a good year and I really want to be with you najud :( 
            Pero 3 months nalang man sad so laban HAHAHAHA. 
            <br /><br />
            I love you so much my cutie baby, my sweetie pie honey bunch sugarplum humpty humpty dum {'>'}-{'<'}
          </p>
          
          <div className="mt-8 pt-6 border-t border-pink-100">
            <p className="font-bold text-pink-500">From the love of your life</p>
            <p className="text-gray-500">- Remor Silva Jr (Your Baby)</p>
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

      {/* Button Container */}
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

        {/* NO BUTTON - Moves based on the scale of the Yes button */}
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