import { createSlice } from '@reduxjs/toolkit'
export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        value: {
            x: 0, y: 0, angle: 0, midAreaElements: []
        }
    },
    reducers: {
        setPosition: (state, action) => {
            state.value = { ...state.value, ...action.payload }
        },
        setMidAreaElements:(state,action)=>{
            console.log("mid",action.payload)
            state.value={...state.value,midAreaElements:action.payload}
        }

    },
})
export const { setPosition,setMidAreaElements } = storeSlice.actions

export default storeSlice.reducer