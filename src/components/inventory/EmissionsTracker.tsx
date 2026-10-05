import React, { useEffect, useMemo, useState } from 'react';
import { useEmissions } from '../../hooks/useEmissions';
import { EmissionSource } from '../../types/emissions';

export const EmissionsTracker: React.FC = () => {
  const { emissions, loading, error, isSubmitting, fetchEmissions, addEmission } = useEmissions();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EmissionSource>('Transporte');
  const [co2Amount, setCo2Amount] = useState<number | ''>('');

  useEffect(() => {
    fetchEmissions();
  }, [fetchEmissions]);

  const totalCO2 = useMemo(() => {
    return emissions.reduce((acc, curr) => acc + curr.co2_amount, 0);
  }, [emissions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || co2Amount === '') return;
    
    const success = await addEmission({
      name,
      category,
      co2_amount: Number(co2Amount)
    });

    if (success) {
      setName('');
      setCategory('Transporte');
      setCo2Amount('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tracker de Emisiones CO2</h2>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold shadow">
          Total: {totalCO2.toFixed(2)} kg
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Fuente
            </label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              placeholder="Ej. Autos de empresa" 
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Categoría
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as EmissionSource)}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="Transporte">Transporte</option>
              <option value="Energía">Energía</option>
              <option value="Residuos">Residuos</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              CO2 (kg)
            </label>
            <input 
              required
              type="number" 
              step="0.01"
              value={co2Amount}
              onChange={(e) => setCo2Amount(Number(e.target.value))}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button 
            disabled={isSubmitting}
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
          >
            {isSubmitting ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {emissions.map(em => (
            <div key={em.id} className="rounded-xl overflow-hidden shadow-lg bg-white p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <div className="font-bold text-xl mb-2 text-gray-800">{em.name}</div>
              <p className="text-gray-600 text-sm mb-4">
                Categoría: <span className="font-semibold px-2 py-1 bg-gray-100 rounded-full">{em.category}</span>
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-900 font-bold text-2xl">
                  {em.co2_amount} <span className="text-sm text-gray-500">kg</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
