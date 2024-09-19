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
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/appSlice";
import { toast } from "react-toastify";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('currentUser');
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success('Successfully logout')

    }
    

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

        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <TextField
            sx={{ width: "250px", margin: "25px", marginRight:'30px'}}
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
          <Button onClick={logout} sx={{ textTransform: "none" , marginRight:'10px'}} color="inherit">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
