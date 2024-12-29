import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#171717] flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-grid">
        {children}
      </main>
    </div>
  );
} 