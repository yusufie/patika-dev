import { createSlice } from "@reduxjs/toolkit";
import { help } from "./helpMarkdownText";

export const markdownSlice = createSlice({
    name: "markdown",
    initialState: {
        textUser: "this is user input",
        textHelp: help,
        isShowingHelp: false,
    },
    reducers: {
        writeText: (state, action) => {
            state.textUser = action.payload;
            state.textCurrent = action.payload;
        },
        helpMe: (state) => {
            if (state.isShowingHelp) {
                state.textCurrent = state.textUser;
                state.isShowingHelp = false;
            } else {
                state.textCurrent = state.textHelp;
                state.isShowingHelp = true;
            }
        },
    }
});

export const { helpMe, writeText } = markdownSlice.actions;

export default markdownSlice.reducer;