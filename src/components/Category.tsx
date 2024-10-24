import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import categoryService from "../services/CategoryService";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/Types";

function Category() {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();

    const getAllCategories =async () => {
        try {
            dispatch(setLoading(true));
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories);
            
        } catch (error) {
            toast.error("An error occured : " + error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const handleCategory = async(e:React.ChangeEvent<HTMLInputElement>, categoryName:string) => {
        try {
            dispatch(setLoading(true));
        if (e.target.checked) {
            //kategoriye gore urun getir
            const products: ProductType[] = await categoryService.getProductsByCategoryName(categoryName);
            dispatch(setProducts(products));
        } else {
            //ekranda butun urunleri goster
            const products: ProductType[] = await productService.getAllProduct();
            dispatch(setProducts(products));
        }
       } catch (error) {
        toast.error("An error occured : " + error);
        
        }
        finally {
        dispatch(setLoading(false));
    }
        
    }

    useEffect(() => {
        getAllCategories();
    },[])




  return (
    <div style={{marginTop:"60px", marginLeft:"20px"}}>
      <FormGroup>
              {
                  categories && categories.map((category: string, index:number) => (
                    <FormControlLabel key={index} control={<Checkbox onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleCategory(e,category)} />} label={category} />
                  ))
       }
      </FormGroup>
    </div>
  );
}

export default Category;
