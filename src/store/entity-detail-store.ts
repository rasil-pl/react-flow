import { create } from 'zustand';
import type { EntityDetailState } from './types';

export const useEntityDetailStore = create<EntityDetailState>()((set) => ({
  selectedEntity: null,
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
}));
