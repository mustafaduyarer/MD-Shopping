import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import categoryService from "../services/CategoryService";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";

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

    const handleCategory = (e:React.ChangeEvent<HTMLInputElement>, categoryName:string) => {
        if (e.target.checked) {
            //kategoriye gore urun getir
        } else {
            //ekranda butun urunleri goster
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
