export default function EventDetailPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center min-h-screen bg-slate-100 md:p-4 lg:p-24">
      <div className="w-full min-w-[320px] max-w-5xl min-h-[600px] bg-white px-8 rounded-md shadow-md md:px-4 md:h-[calc(100vh-16px-16px)] lg:h-[calc(100vh-96px-96px)]">
        {children}
      </div>
    </main>
  );
}
