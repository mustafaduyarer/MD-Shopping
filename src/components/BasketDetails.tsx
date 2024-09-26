import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setDrawer } from "../redux/appSlice";
import { ProductType, UserType } from "../types/Types";
import { Button } from "@mui/material";
import { calculateBasket, removeProductFromBasket, setBasket } from "../redux/basketSlice";
import { toast } from "react-toastify";

function BasketDetails() {

  const { drawer, currentUser } = useSelector((state: RootState) => state.app);
  const { basket, totalAmount } = useSelector(
    (state: RootState) => state.basket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [basket]);

  const closeDrawer = () => {
    dispatch(setDrawer(false));
  };

  const removeProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId))
  }

  const buy = () => {
    if (currentUser?.balance && currentUser.balance < totalAmount) {
      toast.warn('Sorry, Your balance is not enough')
      return;
    }
    if (currentUser?.balance) {
      const remainingTotal = currentUser.balance - totalAmount;

      const payload: UserType = {
        ...currentUser,
        balance:remainingTotal
      }
      dispatch(updateBalance(payload))
      dispatch(setBasket([]));
      localStorage.removeItem("basket");
      toast.success("Products were purchased. Thanks")
    }   
  }

  return (
    <Drawer
      open={drawer}
      anchor="right"
      sx={{ width: "400px" }}
      onClose={closeDrawer}
    >
      {basket &&
        basket.map((product: ProductType) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px 30px",
              }}
            >
              <div style={{ marginRight: "15px" }}>
                <img src={product.image} width={60} height={60} alt="" />
              </div>
              <div style={{ width: "300px" }}>
                <div style={{ fontFamily: "arial", fontWeight: "bold" }}>
                  {product.title.substring(0, 30)}
                </div>
                <div>{product.description.substring(0, 40)}</div>
              </div>
              <div style={{ marginRight: "40px" }}>{product.count}</div>
              <div
                style={{
                  fontFamily: "arial",
                  fontSize: "15px",
                  fontWeight: "bold",
                  width: "70px",
                }}
              >
                {product.price}€{" "}
              </div>
              <div>
                <Button 
                  onClick={()=> removeProduct(product.id)}
                  size="small"
                  sx={{ textTransform: "none", height: "25px" }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        ))}
      <div  style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 30px",
              }}>
        <div style={{ fontSize: '18px', fontFamily: 'arial' }}>Total Price : {totalAmount}€</div>
        
        <div><Button onClick={buy} sx={{textTransform:'none', height:'25px', marginTop:'20px'}} size="small" variant="contained" color="success">Buy</Button></div>

      </div>
    </Drawer>
  );
}

export default BasketDetails;
function updateBalance(payload: UserType): any {
  throw new Error("Function not implemented.");
}

