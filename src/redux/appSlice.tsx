import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType, UserType } from '../types/Types'


export interface AppSliceType{
    currentUser: UserType | null,
    loading: boolean,
    products:ProductType[]
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    products:[]
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state:AppSliceType, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<UserType>) => {
            state.currentUser = action.payload;
        },
        setProducts: (state: AppSliceType, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
    }
})

export const {setLoading ,setCurrentUser,setProducts} = appSlice.actions

export default appSlice.reducer