import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../types/Types'



export interface BasketSliceType {
    basket:ProductType[]
}

const initialState: BasketSliceType = {
    basket:[]
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {

        setBasket: (state: BasketSliceType, action: PayloadAction<ProductType[]>) => {
            state.basket = [...action.payload];
        },

        addProductToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            if (state.basket.length == 0) {
                state.basket = [action.payload];
            } else {
                //iceride urunler varsa
                const findProduct = state.basket.find((product: ProductType) => product.id === action.payload.id);
                if (findProduct) {
                    //bu urun daha onceden eklenmis
                    if (findProduct.count && action.payload.count) {
                        findProduct.count = findProduct.count + action.payload.count;

                        state.basket = [...state.basket.map((product: ProductType) => product.id === findProduct.id ? findProduct : product)];
                    }
                } else {
                    //urun eklnmis
                    state.basket = [...state.basket, action.payload]
                }
            }
            localStorage.setItem("basket", JSON.stringify(state.basket));
        }
    }
})


export const {setBasket, addProductToBasket} = basketSlice.actions

export default basketSlice.reducer