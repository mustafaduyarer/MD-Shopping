import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MDLogo from "../images/LOGO1.png";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, setCurrentUser, setProducts } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { ProductType } from "../types/Types";
import { FaBasketShopping } from "react-icons/fa6";
import Badge from "@mui/material/Badge";
import { RootState } from "../redux/store";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { basket } = useSelector((state: RootState) => state.basket);

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
    navigate("/login");
    toast.success("Successfully logout");
  };

  const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value) {
        //filtrele
        dispatch(filterProducts(e.target.value));
      } else {
        //butun urunleri goster
        const products: ProductType[] = await productService.getAllProduct();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("An error occured : " + error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2BBD7E" }}>
      <Toolbar>
        <IconButton
          onClick={() => navigate("/")}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={MDLogo} width={180} height={80} />
        </IconButton>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          MD-Shopping
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilter(e)
            }
            sx={{ width: "250px", margin: "25px", marginRight: "30px" }}
            id="searchInput"
            placeholder="searching products"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                style: {
                  color: "white",
                  borderBottom: "2px solid lightgrey",
                },
              },
            }}
            variant="standard"
          />

          <Badge badgeContent={basket.length} color="warning" sx={{margin:'0px 15px'}}>
          <FaBasketShopping style={{ fontSize: "18px",  cursor: "pointer" }} />
          </Badge>

           <Button
            onClick={logout}
            sx={{ textTransform: "none", marginRight: "10px" }}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
