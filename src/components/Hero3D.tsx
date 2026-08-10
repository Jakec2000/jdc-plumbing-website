import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { WebGLFallback } from './WebGLFallback';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type NetworkNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2', { powerPreference: 'high-performance' }) ||
          canvas.getContext('webgl', { powerPreference: 'high-performance' })),
    );
  } catch {
    return false;
  }
}

function dataSaverEnabled() {
  return Boolean((navigator as NetworkNavigator).connection?.saveData);
}

export function Hero3D() {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();

    const canRender3D = supportsWebGL() && !dataSaverEnabled();
    setWebgl(canRender3D);

    const idleWindow = window as IdleWindow;
    let cancelReady: () => void = () => {};

    if (canRender3D) {
      if (idleWindow.requestIdleCallback) {
        const handle = idleWindow.requestIdleCallback(() => setReady(true), { timeout: 900 });
        cancelReady = () => idleWindow.cancelIdleCallback?.(handle);
      } else {
        const handle = window.setTimeout(() => setReady(true), 250);
        cancelReady = () => window.clearTimeout(handle);
      }
    }

    motion.addEventListener?.('change', updateMotion);
    return () => {
      motion.removeEventListener?.('change', updateMotion);
      cancelReady();
    };
  }, []);

  if (!ready || !webgl) return <WebGLFallback />;

  return (
    <ErrorBoundary fallback={<WebGLFallback />}>
      <Suspense fallback={<WebGLFallback />}>
        <Hero3DScene reducedMotion={reducedMotion} />
      </Suspense>
    </ErrorBoundary>
  );
}
