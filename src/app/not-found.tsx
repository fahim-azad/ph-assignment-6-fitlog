import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center py-20 px-6 text-center h-[60vh]">
      <h2 
        className="text-7xl font-bold text-[#ccff00] mb-4" 
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        404
      </h2>
      <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">
        Page Not Found
      </h3>
      <p className="text-neutral-400 mb-8 max-w-md">
        The workout or page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="btn no-animation bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold uppercase border-none rounded-md px-8 min-h-[3rem] h-12 text-sm tracking-wide"
      >
        Return Home
      </Link>
    </div>
  );
}
