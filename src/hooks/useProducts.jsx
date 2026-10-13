//Lo quiero profe wilfredo
import { useState, useEffect, useCallback, useRef } from 'react';
import { API_URL } from '../constants/config';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('No se pudo cargar el menú');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Ocurrió un error inesperado');
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
