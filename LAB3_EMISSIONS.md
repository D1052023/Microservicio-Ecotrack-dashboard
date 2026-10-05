# Bitácora de Prompts - Spec-to-Code: Dashboard de Emisiones

## Iteración 1: Estructura (Tipos)
**Prompt utilizado:**
"Crea el archivo `src/types/emissions.ts` con las interfaces de TypeScript:
- `EmissionSource`: 'Transporte' | 'Energía' | 'Residuos'
- `EmissionItem`: id (string), name (string), category (EmissionSource), co2_amount (number), created_at (string)
- `NewEmissionPayload`: Omit<EmissionItem, 'id' | 'created_at'>"

## Iteración 2: Lógica (Custom Hook)
**Prompt utilizado:**
"Crea el custom hook `src/hooks/useEmissions.ts` que desacople la lógica de Supabase de la interfaz visual. Debe manejar los estados `emissions`, `loading`, `error` e `isSubmitting`. Incluye funciones asíncronas para obtener datos (`fetchEmissions`) e insertar nuevas mediciones (`addEmission`). Soporta fallback a datos simulados si la conexión a Supabase falla o no está configurada."

## Iteración 3: Refinamiento (UI/UX)
**Prompt utilizado:**
"Crea el componente `src/components/inventory/EmissionsTracker.tsx` usando React + TypeScript y Tailwind CSS. Debe contener un formulario de inserción (Nombre, Categoría, CO2) y renderizar tarjetas responsivas con indicadores visuales por categoría. Optimiza el renderizado mediante `useMemo` para métricas globales (ej. total de CO2). Implementa manejo de estados de carga (Skeleton/Spinners) y alertas de error accesibles."

## Iteración 4: Resiliencia (Fallback y manejo de errores)
**Prompt utilizado:**
"Asegúrate de que la aplicación sea robusta ante fallos en la red o base de datos. Implementa el manejo de errores capturando excepciones en las funciones asíncronas del custom hook, mostrando mensajes de error claros en la UI y usando un fallback a datos simulados para permitir el uso ininterrumpido del dashboard."
