import { useEffect } from 'react';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  return (
    <div aria-live="polite" className="fixed bottom-6 left-1/2 z-[70] w-max max-w-[90vw] -translate-x-1/2">
      {toast && (
        <p
          role="status"
          className={`rounded-md px-4 py-2 text-[15px] shadow-lg ${
            toast.type === 'error' ? 'bg-accent text-white' : 'bg-paper text-ink'
          }`}
        >
          {toast.message}
        </p>
      )}
    </div>
  );
}
