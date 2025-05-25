'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react'; // Importar useEffect
import { useDispatch } from 'react-redux'; // Importar useDispatch
import { hydrateFavorites } from './features/favorites/favoritesSlice'; // Importar la nueva acción

interface Props {
  children: React.ReactNode;
}

// Componente Wrapper para la hidratación
function FavoritesHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Este código solo se ejecuta en el cliente después de la primera renderización
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        dispatch(hydrateFavorites(JSON.parse(storedFavorites)));
      }
    }
  }, [dispatch]); // El dispatch no cambia, así que el efecto solo se ejecuta una vez

  return <>{children}</>;
}

export function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      {/* Envolvemos children con el nuevo componente de hidratación */}
      <FavoritesHydrator>
        {children}
      </FavoritesHydrator>
    </Provider>
  );
}