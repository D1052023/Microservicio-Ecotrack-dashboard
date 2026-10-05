export type EmissionSource = 'Transporte' | 'Energía' | 'Residuos';

export interface EmissionItem {
  id: string;
  name: string;
  category: EmissionSource;
  co2_amount: number;
  created_at: string;
}

export type NewEmissionPayload = Omit<EmissionItem, 'id' | 'created_at'>;
