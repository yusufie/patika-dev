import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notesData: [],
    filterText: "",
    filteredNotes: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.notesData.push(action.payload);
      state.filteredNotes = state.notesData;
    },
    editNote: (state, action) => {
      let findIndex = state.notesData.findIndex(
        (note) => note.id === action.payload.id
      );

      state.notesData[findIndex].note = action.payload.note;
      state.filteredNotes = state.notesData;
    },
    deleteNote: (state, action) => {
      let filter = state.notesData.filter(
        (item) => item.id !== action.payload.id
      );

      state.notesData = filter;
      state.filteredNotes = state.notesData;
    },
    setFilter: (state, action) => {
      state.filterText = action.payload;
      state.filteredNotes = state.notesData.filter((item) =>
        item.note.includes(state.filterText)
      );
    },
  },
});

export const selectNotes = (state) => state.notes.notesData;

export const selectFilterText = (state) => state.notes.filterText;

export const selectFilteredNotes = (state) => state.notes.filteredNotes;

export const { addNote, editNote, deleteNote, setFilter } = notesSlice.actions;
