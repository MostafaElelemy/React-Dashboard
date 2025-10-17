import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NotePriority } from '../types';

type LocalState = {
  notes: Note[];
  addNote: (text: string, priority: NotePriority) => void;
  deleteNote: (id: string) => void;
  updateNotePriority: (id: string, p: NotePriority) => void;
  todoOverrides: Record<number, boolean>;
  toggleTodo: (id: number, current: boolean) => void;
};

export const useLocal = create<LocalState>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote(text, priority) {
        const n: Note = { id: crypto.randomUUID(), text, priority, createdAt: Date.now() };
        set({ notes: [n, ...get().notes] });
      },
      deleteNote(id) {
        set({ notes: get().notes.filter((n) => n.id !== id) });
      },
      updateNotePriority(id, p) {
        set({ notes: get().notes.map((n) => (n.id === id ? { ...n, priority: p } : n)) });
      },
      todoOverrides: {},
      toggleTodo(id, current) {
        const next = { ...get().todoOverrides, [id]: !current };
        set({ todoOverrides: next });
      },
    }),
    { name: 'local-state' }
  )
);
