import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(
          'beforeinstallprompt',
          handleBeforeInstallPrompt
        );
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  // Don't render on server side or if prompt shouldn't show
  if (!isClient || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 left-4 z-[9999] rounded-lg bg-blue-600 p-4 text-white shadow-lg md:right-4 md:left-auto md:max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold">
            Install Cross Stitch Generator
          </h3>
          <p className="mt-1 text-xs opacity-90">
            Install this app for a better experience and offline access.
          </p>
        </div>
        <div className="ml-4 flex gap-2">
          <button
            onClick={handleDismiss}
            className="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
          >
            Later
          </button>
          <button
            onClick={handleInstallClick}
            className="rounded bg-white px-2 py-1 text-xs text-blue-600 hover:bg-gray-100"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
