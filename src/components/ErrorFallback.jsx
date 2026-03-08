export function ErrorFallback() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f7f7f6] text-center p-6">
      <h1 className="font-serif text-4xl text-boundry-primary mb-2">404</h1>
      <h2 className="font-serif text-3xl text-stone-900 mb-2">
        Something went wrong.
      </h2>
      <p className="text-stone-500 font-light mb-6">
        We couldn't load this sanctuary. Please try again.
      </p>
      {/* <button
        onClick={() => window.location.reload()}
        className="bg-boundry-primary text-white px-8 py-3 rounded-full hover:bg-stone-900 transition-all cursor-pointer"
      >
        Refresh Page
      </button>*/}
    </div>
  );
}
