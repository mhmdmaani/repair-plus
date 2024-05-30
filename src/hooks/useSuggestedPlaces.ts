import { Map } from '@/api/map';
import { useEffect, useState } from 'react';

export const useSuggestedPlaces = (input: string) => {
  const [placePredictions, setPlacePredictions] = useState<any[]>([]);
  useEffect(() => {
    if (input?.length > 0) {
      Map.getSuggestion(input).then((data) => {
        setPlacePredictions(data.predictions);
      });
    }
  }, [input]);

  return { placePredictions };
};
