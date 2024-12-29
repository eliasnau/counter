import Link from "next/link";

export default function Legal() {
  return (
    <main className="min-h-screen pt-24 pb-8 bg-grid">
      <div className="max-w-2xl mx-auto space-y-12 p-4">
        {/* Back Button */}
        <div className="w-full">
          <Link
            href="/"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            ← Back to Game
          </Link>
        </div>

        <h1 className="font-mono text-2xl text-neutral-100">
          Legal Information
        </h1>

        {/* Legal Links Section */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Privacy Policy
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              Learn how we handle and protect your data.
            </p>
            <Link
              href="/legal/privacy-policy"
              className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
            >
              View Privacy Policy →
            </Link>
          </div>

          <div className="w-full flex flex-col gap-2">
            <p className="font-mono text-left text-sm text-neutral-100">
              Terms of Service
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              Read about the rules and guidelines for using our service.
            </p>
            <Link
              href="/legal/terms-of-service"
              className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-mono text-left text-sm text-neutral-100">
            Contact
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            If you have any questions about our legal documents, please contact us at:
          </p>
          <Link
            href="mailto:contact@eliasnau.dev"
            className="font-mono text-left text-sm text-[#00FFFF] hover:underline"
          >
            contact@eliasnau.dev
          </Link>
        </div>
      </div>
    </main>
  );
} 