export default function EventDetailPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center bg-slate-100 md:p-4 lg:p-24">
      <div className="w-full min-w-[320px] max-w-5xl min-h-screen bg-white px-8 rounded-md shadow-md md:px-4 md:min-h-[600px] md:h-[calc(100vh-16px-16px)] lg:h-[calc(100vh-96px-96px)]">
        {children}
      </div>
    </main>
  );
}
