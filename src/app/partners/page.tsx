import Link from "next/link";

const PARTNER_SITES = {
  official: [
    {
      name: "CounterClick",
      url: "https://counter.eliasnau.dev",
      description: "The original counter platform",
      color: "#00FFFF",
      isPulsing: true,
    }
  ],
  partners: [
    {
      name: "Apoclick",
      url: "https://apoclick.zayneed.cloud",
      description: "A Apored themed clicker",
      color: "#FF4D4D",
    }
    // Add more partners here
  ],
  community: [
    // Add community sites here
  ]
};

export default function Partners() {
  return (
    <main className="min-h-screen pt-24 pb-8 bg-grid">
      <div className="max-w-2xl mx-auto space-y-12 p-4">
        <div className="w-full">
          <Link
            href="/"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            ← Back to Counter
          </Link>
        </div>

        <h1 className="font-mono text-2xl text-neutral-100">
          CounterClick Network
        </h1>

        {/* Official Platform */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-mono text-neutral-100">Official Platform</h2>
          {PARTNER_SITES.official.map((site) => (
            <div key={site.url} className="w-full p-4 bg-[#1c1c1c] rounded-xl border border-[#00FFFF]/20">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${site.isPulsing ? 'animate-pulse' : ''}`} 
                     style={{ backgroundColor: site.color }} />
                <h3 className="font-mono text-[#00FFFF]">{site.name}</h3>
              </div>
              <p className="font-mono text-neutral-400 mb-2">{site.description}</p>
              <a 
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                {site.url.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>

        {/* Partners & Friends */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-mono text-neutral-100">Partners & Friends</h2>
          {PARTNER_SITES.partners.map((site) => (
            <div key={site.url} className="w-full p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] hover:border-[#00FFFF]/10 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: site.color }} />
                <h3 className="font-mono text-neutral-300">{site.name}</h3>
              </div>
              <p className="font-mono text-neutral-400 mb-2">{site.description}</p>
              <a 
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                {site.url.replace('https://', '')}
              </a>
            </div>
          ))}
        </div>

        {/* Community */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-mono text-neutral-100">Community</h2>
          <div className="w-full p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] text-center">
            <p className="font-mono text-neutral-400">No community sites yet</p>
          </div>
        </div>

        {/* Add Partner Button */}
        <a 
          href="mailto:your@email.com?subject=CounterClick%20Partnership"
          className="block w-full p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                   hover:bg-[#252525] hover:border-[#00FFFF]/10 
                   transition-all duration-200 text-center
                   font-mono text-neutral-400 hover:text-neutral-300"
        >
          + Add Your Site
        </a>
      </div>
    </main>
  );
} 