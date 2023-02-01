import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: state => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;

      state.notes = state.notes.map(note => (note.id === payload.id ? payload : note));

      state.messageSaved = `${payload.title} updated correctly`;
    },

    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.activeNote = null;
    },

    deleteNoteById: (state, action) => {
      state.activeNote = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
