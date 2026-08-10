import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { WebGLFallback } from './WebGLFallback';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

export function Hero3D() {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(motion.matches);
    update();
    setWebgl(supportsWebGL());
    const id = window.requestIdleCallback ? window.requestIdleCallback(() => setReady(true), { timeout: 900 }) : window.setTimeout(() => setReady(true), 250);
    motion.addEventListener?.('change', update);
    return () => {
      motion.removeEventListener?.('change', update);
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id);
      else clearTimeout(id);
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
