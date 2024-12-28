/* eslint-disable react/no-unescaped-entities */


export default function Tutorial() {
  return (
    <main className="min-h-screen pt-24 pb-8 bg-grid">
      <div className="max-w-2xl mx-auto space-y-12 p-4">
        {/* Back Button */}
        <div className="w-full">
          <a 
            href="/"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            ← Back to Game
          </a>
        </div>

        <h1 className="font-mono text-2xl text-neutral-100">
          How to Play
        </h1>

        {/* Counter Info Section */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-mono text-left text-sm text-neutral-100">
            About the Counter
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            The counter is shared between all players in real-time.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Each player can increment or decrement the counter using the available buttons.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            The counter cannot go below 0 or exceed the maximum value.
          </p>
        </div>

        {/* Action Buttons Section */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-mono text-left text-sm text-neutral-100">
            Action Buttons
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Green buttons (+1 to +3) increase the counter.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Red buttons (-2 to -6) decrease the counter.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            The buttons change position after each use to add variety.
          </p>
        </div>

        {/* Cooldown Section */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-mono text-left text-sm text-neutral-100">
            Cooldown System
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            After each action, there is a 500ms cooldown period.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            The progress bar shows the remaining cooldown time.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            You cannot perform any actions during the cooldown period.
          </p>
        </div>

        {/* Multiplayer Section */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-mono text-left text-sm text-neutral-100">
            Multiplayer Experience
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            All changes are synchronized in real-time across all players.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            You can see other players' actions immediately as they happen.
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Work together or compete - it's up to you!
          </p>
        </div>

        {/* Example Card */}
        <div className="w-full flex flex-col gap-4 pt-8">
          <p className="font-mono text-left text-sm text-neutral-100">
            Game Interface
          </p>
          <div className="min-h-[400px] w-full flex items-center justify-center bg-[#171717] rounded-2xl border border-white/[0.04] p-8">
            <div className="flex flex-col items-center gap-8">
              {/* Counter Display */}
              <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-white/[0.04]">
                <div className="flex gap-1">
                  {Array.from('0000042').map((digit, idx) => (
                    <div key={idx} className="w-12 h-16 flex items-center justify-center bg-[#1c1c1c] rounded-lg border border-white/[0.04]">
                      <span className="text-3xl font-mono text-[#00FFFF]">{digit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full space-y-4">
                {/* Status Bar */}
                <div className="text-sm text-neutral-600 flex justify-between">
                  <span>Status</span>
                  <span>Cooldown Ready</span>
                </div>
                
                {/* Cooldown Bar */}
                <div className="w-full h-[1px] bg-white/[0.04]">
                  <div className="h-full bg-[#00FFFF] w-full" />
                </div>

                {/* Action Buttons */}
                <div className="w-full max-w-md grid grid-cols-3 gap-2">
                  <div className="h-14 bg-[#1c1c1c] rounded-xl border border-white/[0.04] flex items-center justify-center">
                    <span className="text-2xl font-mono text-[#00FFFF]">+3</span>
                  </div>
                  <div className="h-14 bg-[#1c1c1c] rounded-xl border border-white/[0.04] flex items-center justify-center">
                    <span className="text-2xl font-mono text-red-500">-6</span>
                  </div>
                  <div className="h-14 bg-[#1c1c1c] rounded-xl border border-white/[0.04] flex items-center justify-center">
                    <span className="text-2xl font-mono text-[#00FFFF]">+1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 