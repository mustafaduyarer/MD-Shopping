import React from "react";
import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterPageSchema";
import { UserType } from "../types/Types";
import registerPageService from "../services/RegisterPageService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        id: String(Math.floor(Math.random() * 999999)),
        username: values.username,
        password: values.password,
        balance: 1000
      };
      const response = await registerPageService.register(payload);
      if (response) {
        clear();
        toast.success('Successfully added');
        navigate("/login");
      }
    } catch (error) {
      toast.error('An error occurred'+error)
    }
  };

  const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: submit,
    validationSchema: registerPageSchema,
  });

  const clear = () => {
    resetForm();
  };

  return (
    <div className="register">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <TextField
              sx={{ width: "300px", margin: "25px" }}
              id="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
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
              helperText={
                errors.username && (
                  <span style={{ color: "red" }}>{errors.username}</span>
                )
              }
            />

            <TextField
              sx={{ width: "300px", margin: "25px" }}
              id="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
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
              helperText={
                errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )
              }
            />

            <div>
              <Button
                type="submit"
                size="small"
                sx={{
                  textTransform: "none",
                  height: "28px",
                  marginRight: "10px",
                }}
                variant="contained"
                color="info"
              >
                Sign Up
              </Button>
              <Button
                onClick={clear}
                size="small"
                sx={{
                  textTransform: "none",
                  height: "28px",
                  marginRight: "10px",
                  backgroundColor: "#CDA735",
                }}
                variant="contained"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
