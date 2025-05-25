import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {favorites: FavoritesState}
export type AppDispatch = typeof store.dispatch;