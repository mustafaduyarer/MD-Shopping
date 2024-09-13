import React from "react";
import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { Button } from "@mui/material";

function RegisterPage() {
  return (
    <div className="register">
      <div className="main">
        <form>
          <div className="form-div">
            <TextField
              sx={{ width: "300px", margin: "25px" }}
              id="username"
              placeholder="Username"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoPersonCircleSharp />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
            />

            <TextField
              sx={{ width: "300px", margin: "25px" }}
              id="username"
              type="password"
              placeholder="Password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLockClosed />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
            />

            <div>
              <Button size="small" sx={{ textTransform:'none', height: '28px', marginRight: '10px'}} variant="contained" color="info" >Sign Up</Button>
              <Button size="small" sx={{ textTransform:'none', height: '28px', marginRight: '10px', backgroundColor:'#CDA735'}} variant="contained" >Clear</Button>
            
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
