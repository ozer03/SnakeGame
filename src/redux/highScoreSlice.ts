import { createSlice } from "@reduxjs/toolkit";

export interface HighScoreState {
    playerName: string | null
    playerLevel: number | null
    highestScore: number | null
};

const initialState: HighScoreState = {
    highestScore: 0,
    playerName: null,
    playerLevel: null
};

export const highScoreSlice = createSlice({
    name: 'highScore',
    initialState,
    reducers: {
        setHighestScore: (state, action) => {
            state.highestScore = action.payload
        },
        setPlayerName: (state, action) => {
            state.playerName = action.payload
        },
        setPlayerLevel: (state, action) => {
            state.playerLevel = action.payload
        },
    },
});


export const {setHighestScore, setPlayerName, setPlayerLevel} = highScoreSlice.actions;
export default highScoreSlice.reducer;