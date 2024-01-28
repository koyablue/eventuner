export default function NewEventPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center min-h-screen bg-slate-100 md:p-24">
      <div className="w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md shadow-md lg:px-4 lg:h-[calc(100vh-96px-96px)]">
      {children}
      </div>
    </main>
  );
}
