import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const memoryState: { toasts: Toast[] } = { toasts };

function addToast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { ...toast, id };
  
  memoryState.toasts = [newToast, ...memoryState.toasts];
  listeners.forEach((listener) => listener(memoryState.toasts));
  
  setTimeout(() => {
    memoryState.toasts = memoryState.toasts.filter((t) => t.id !== id);
    listeners.forEach((listener) => listener(memoryState.toasts));
  }, 5000);
}

function removeToast(id: string) {
  memoryState.toasts = memoryState.toasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(memoryState.toasts));
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(memoryState.toasts);

  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    addToast(props);
  }, []);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    subscribe,
  };
}
