import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerPageSchema } from "../schemas/RegisterPageSchema";
import "../css/LoginPage.css";
import loginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { UserType } from "../types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CheckUserType {
  result: boolean,
  currentUser: UserType | null
}

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = (
    userList: UserType[],username: string, password: string):CheckUserType => {
    
    const response:CheckUserType= {result:false, currentUser:null}
    userList.forEach((user: UserType) => {
      if (user.username === username && user.password === password) {
        response.result = true;
        response.currentUser = user;
      }
    });
    return response;
  };

  const submit = async (values: any, action: any) => {
    try {
      dispatch(setLoading(true));
      const response: UserType[] = await loginPageService.login();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          //correct user
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
          navigate("/");
        } else {
          //wrong user
          toast.error("Wrong username or password")
        }
      }
    } catch (error) {
      toast.error("An error accoured: " + error);
    } finally {
      dispatch(setLoading(false));
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
  );
}

export default LoginPage;
