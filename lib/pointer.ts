type Listener = (x: number, y: number) => void;

const listeners = new Set<Listener>();
let installed = false;
let frame = 0;
let lastX = 0;
let lastY = 0;

function onMove(e: PointerEvent) {
  lastX = e.clientX;
  lastY = e.clientY;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    listeners.forEach((l) => l(lastX, lastY));
  });
}

/** Shared, rAF-throttled pointer position so many consumers cost one listener. */
export function subscribePointer(listener: Listener): () => void {
  listeners.add(listener);
  if (!installed) {
    window.addEventListener("pointermove", onMove, { passive: true });
    installed = true;
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && installed) {
      window.removeEventListener("pointermove", onMove);
      installed = false;
    }
  };
}
