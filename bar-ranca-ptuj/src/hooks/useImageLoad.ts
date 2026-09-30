import { useState, useEffect, useCallback } from 'react';

export function useImageLoad(src?: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => setError(true), []);

  useEffect(() => {
    if (!src) return;
    setLoaded(false);
    setError(false);
    const img = new Image();
    img.src = src;
    img.onload = onLoad;
    img.onerror = onError;
  }, [src, onLoad, onError]);

  return { loaded, error };
}