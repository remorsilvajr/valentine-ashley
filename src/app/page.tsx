"use client";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // This calculates the size of the Yes button
  // Base size is 1. Every click adds 30% (0.3) growth.
  const yesButtonSize = noCount * 20 + 16; 

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function handleYesClick() {
    setYesPressed(true);
    // Trigger the confetti explosion
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000']
    });
  }

  // ---------------------------------------------------------
  // VIEW 1: SHE SAID YES! (The Success Screen)
  // ---------------------------------------------------------
  if (yesPressed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 p-8 text-center animate-in fade-in zoom-in duration-500">
        
        {/* Cute Header */}
        <h1 className="text-6xl font-bold text-red-600 mb-4 drop-shadow-sm">
          Yeeeeeeyy!!! 💖
        </h1>
        
        <h2 className="text-2xl font-semibold text-pink-600 mb-8">
          Thank you, babyyyy. I love you so muchhh :3
        </h2>

        {/* The Letter Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-lg border-2 border-pink-200">
          <p className="text-gray-700 text-lg leading-relaxed text-left font-medium">
            Dear <strong>Ashley Jane Silva My Baby</strong>,
            <br /><br />
            This is our 2nd valentine&apos;s na baby and I&apos;m so glad na we&apos;re still going strong japun hehe. 
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
  // VIEW 2: THE PROPOSAL (Question Screen)
  // ---------------------------------------------------------
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-100 p-4 overflow-hidden relative">
      
      {/* Optional: Add a cute GIF here if you want! */}
      {/* <img src="https://media.tenor.com/..." className="h-[200px]" /> */}

      <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 text-center drop-shadow-md">
        Will you be my Valentine? 🌹
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        
        {/* The YES Button (Grows on every No click) */}
        <button
          className="rounded bg-green-500 font-bold text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          style={{ fontSize: yesButtonSize }}
          onClick={handleYesClick}
        >
          YES
        </button>

        {/* The NO Button (Runs away logic implied by growing Yes button) */}
        <button
          onClick={handleNoClick}
          className="rounded bg-red-500 px-8 py-4 font-bold text-white hover:bg-red-600 transition-all duration-300 shadow-lg"
        >
          {noCount === 0 ? "No" : "Are you sure? 😢"}
        </button>
      </div>

    </main>
  );
}