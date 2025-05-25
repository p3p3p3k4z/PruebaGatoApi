import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/interfaces/product';

interface FavoritesState {
  items: Product[];
  // Añadimos una bandera para saber si el estado ha sido "hidratado" desde localStorage
  _hydrated: boolean;
}

const initialState: FavoritesState = {
  items: [], // Siempre inicia vacío en el servidor y cliente para evitar desajustes
  _hydrated: false, // Indica que el estado aún no ha sido cargado desde localStorage
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Nueva acción para "hidratar" el estado desde localStorage
    hydrateFavorites: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state._hydrated = true;
    },
    addFavorite: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      if (!state.items.some(item => item.id === productToAdd.id)) {
        state.items.push(productToAdd);
        // Guardar en localStorage inmediatamente al agregar
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Guardar en localStorage inmediatamente al remover
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

// Exportamos la nueva acción
export const { addFavorite, removeFavorite, hydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;