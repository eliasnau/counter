/* eslint-disable react/no-unescaped-entities */
export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-24 pb-8 bg-grid">
      <div className="max-w-2xl mx-auto space-y-12 p-4">
        {/* Back Button */}
        <div className="w-full">
          <a 
            href="/legal"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            ← Back to Legal
          </a>
        </div>

        <h1 className="font-mono text-2xl text-neutral-100">
          Privacy Policy
        </h1>

        <div className="w-full flex flex-col gap-8">
          {/* Introduction */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Last Updated: March 2024
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              This privacy policy explains how Counter Click ("we", "us", "our") collects and processes your information.
            </p>
          </div>

          {/* Data Collection */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Information We Collect
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              We collect minimal data necessary for the game to function:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li className="font-mono text-left text-sm text-neutral-400">
                Temporary anonymous session IDs (handled by Appwrite)
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                IP addresses (for rate limiting and abuse prevention)
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Game actions (counter increments/decrements)
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Technical logs for troubleshooting (stored for 24 hours)
              </li>
            </ul>
          </div>

          {/* How We Use Data */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              How We Use Your Information
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li className="font-mono text-left text-sm text-neutral-400">
                Maintain the game state
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Enable real-time multiplayer functionality
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Prevent abuse and automated interactions
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Debug technical issues
              </li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Data Sharing
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              We use Appwrite as our backend service provider. No data is shared with any other third parties.
            </p>
          </div>

          {/* Data Retention */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Data Retention
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              - Anonymous sessions expire after 365 days of inactivity
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              - IP addresses are stored temporarily for rate limiting
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              - Game actions are stored indefinitely for the shared counter functionality
            </p>
          </div>

          {/* Contact */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Contact Us
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a 
              href="mailto:contact@eliasnau.dev"
              className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
            >
              contact@eliasnau.dev
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 