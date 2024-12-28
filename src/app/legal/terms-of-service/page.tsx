/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-24 pb-8 bg-grid">
      <div className="max-w-2xl mx-auto space-y-12 p-4">
        {/* Back Button */}
        <div className="w-full">
          <Link
            href="/legal"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            ← Back to Legal
          </Link>
        </div>

        <h1 className="font-mono text-2xl text-neutral-100">
          Terms of Service
        </h1>

        <div className="w-full flex flex-col gap-8">
          {/* Introduction */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Last Updated: March 2024
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              By using Counter Click, you agree to these terms. Please read them carefully.
            </p>
          </div>

          {/* Usage Rules */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Acceptable Use
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              You agree to use Counter Click only as intended through the provided user interface. The following are strictly prohibited:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li className="font-mono text-left text-sm text-neutral-400">
                Bots, scripts, or automated interactions
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Attempts to bypass the cooldown system
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Multiple sessions to manipulate the counter
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Any form of automated clicking or interaction
              </li>
            </ul>
          </div>

          {/* Game Rules */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Game Mechanics
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              The following rules govern gameplay:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li className="font-mono text-left text-sm text-neutral-400">
                500ms cooldown between actions must be respected
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Counter values are limited to specific increments (-6 to +3)
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                The counter cannot go below 0
              </li>
            </ul>
          </div>

          {/* Future Features */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Upcoming Features
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              We plan to implement additional features including:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li className="font-mono text-left text-sm text-neutral-400">
                Private clicker instances
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Level and XP system for logged-in users
              </li>
              <li className="font-mono text-left text-sm text-neutral-400">
                Enhanced rate limiting based on IP and session
              </li>
            </ul>
          </div>

          {/* Modifications */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Modifications to Service
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              We reserve the right to modify or discontinue the service at any time. We may also update these terms as needed.
            </p>
          </div>

          {/* Contact */}
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Contact Us
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              If you have any questions about these Terms, please contact us at:
            </p>
            <Link
              href="mailto:contact@eliasnau.dev"
              className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
            >
              contact@eliasnau.dev
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 