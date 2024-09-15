
import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterPageSchema";
import "../css/LoginPage.css";
 

function LoginPage () {

  const submit = (values:any, action:any) => {
    try {
      //devam edcek
    } catch (error) {
      
    }
  }

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
    <div className="login">
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
                Login
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
  )
}

export default LoginPage