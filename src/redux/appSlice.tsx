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
        setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
        setProducts: (state: AppSliceType, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
        filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {

            const templist: ProductType[] = [];

            state.products.map((product: ProductType) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    templist.push(product);
                }
            })
            state.products = [...templist];
        },
    }//reducers
})

export const {setLoading ,setCurrentUser,setProducts, filterProducts} = appSlice.actions

export default appSlice.reducer