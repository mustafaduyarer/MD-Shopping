import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/Types";
import { Button } from "@mui/material";
import { addProductToBasket } from "../redux/basketSlice";

function PoductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [count, setCount] = useState<number>(0);

  const [product, setProduct] = useState<ProductType | null>();

  const getProductId = async (productId: number) => {
    try {
      dispatch(setLoading(true));
      const product: ProductType = await productService.getProductByID(
        productId
      );
      setProduct(product);
    } catch (error) {
      toast.error("An error occurred" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addBasket = () => {
    if (product) {
      const payload: ProductType = {
        ...product,
        count:count
      }
      dispatch(addProductToBasket(payload))
      toast.success('Products has been successfully added')
    }
  }

  useEffect(() => {
    getProductId(Number(productId));
  }, []);

  return (
    <Container maxWidth="lg">
      {product && (
        <>
          <div style={{display: 'flex', flexDirection: 'row', alignItems:'flex-start', justifyContent:'flex-start', marginTop:'60px'}}>
            <div>
              <img src={product.image} width={400} height={500} alt="" />
            </div>
            <div style={{marginLeft:'60px', marginTop:'60px'}}>
              <div style={{ fontFamily: 'arial', fontSize: '30px',fontWeight:'bold' }}>{product.title}</div>
              <div style={{ fontFamily: 'arial', fontSize: '20px', marginTop:'25px', height:'100px',marginBottom:"40px" }}>{product.description}</div>
              <div style={{ fontFamily: 'arial', fontSize: '40px', fontWeight: 'bold' }}>{product.price}€</div>
              
              <div style={{marginTop:'20px'}}>
                <span onClick={()=> setCount(count+1)} style={{ color:'#2BBD7E', fontSize: '50px',fontWeight:'bold', cursor:'pointer', marginRight:'25px'}}>+</span>
                <span style={{ fontSize: '40px', fontFamily: 'arial' }}>{count}</span>
                <span onClick={()=> setCount(count-1)} style={{color:'#2BBD7E', fontSize: '50px',fontWeight:'bold', cursor:'pointer', marginLeft:'25px'}}>-</span>
              </div>

              <div>
                <Button onClick={addBasket} color="info" variant="contained" size="medium" sx={{textTransform:'none', marginTop:'20px'}}>  Add Cart  </Button>
              </div>

            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default PoductDetail;
