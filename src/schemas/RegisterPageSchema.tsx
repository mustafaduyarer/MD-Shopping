import * as yup from "yup";

export const registerPageSchema = yup.object().shape({
  username: yup.string().required("Please write username"),
  password: yup.string().required("Please write password"),
});
