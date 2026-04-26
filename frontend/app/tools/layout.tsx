import { ToolSidebar } from '@/components/ToolSidebar';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex lg:pl-56" suppressHydrationWarning>
      {/* Sidebar lives here — never unmounts between tool navigations */}
      <ToolSidebar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        {children}
      </div>
    </div>
  );
}
