import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  duration?: number; // em ms
  onClose?: () => void;
};

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-gray-800 px-4 py-2 text-white shadow-md transition-opacity">
      {message}
    </div>
  );
}
