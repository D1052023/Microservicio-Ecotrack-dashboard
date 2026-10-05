import { useState, useCallback } from 'react';
import { EmissionItem, NewEmissionPayload } from '../types/emissions';

const MOCK_DATA: EmissionItem[] = [
  { id: '1', name: 'Flota vehicular', category: 'Transporte', co2_amount: 150.5, created_at: new Date().toISOString() },
  { id: '2', name: 'Centro de datos', category: 'Energía', co2_amount: 345.2, created_at: new Date().toISOString() }
];

export const useEmissions = () => {
  const [emissions, setEmissions] = useState<EmissionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchEmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Supabase fetch logic here
      // Fallback
      await new Promise(resolve => setTimeout(resolve, 800));
      setEmissions(MOCK_DATA);
    } catch (err: any) {
      setError('Error al obtener los datos. Usando datos de respaldo.');
      setEmissions(MOCK_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmission = async (payload: NewEmissionPayload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEmission: EmissionItem = {
        id: Math.random().toString(36).substring(2, 9),
        ...payload,
        created_at: new Date().toISOString()
      };
      setEmissions(prev => [newEmission, ...prev]);
      return true;
    } catch (err: any) {
      setError('Error al insertar medición');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    emissions,
    loading,
    error,
    isSubmitting,
    fetchEmissions,
    addEmission
  };
};
