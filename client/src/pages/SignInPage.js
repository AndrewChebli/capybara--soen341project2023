import React from "react";
import SignInForm from "../components/SignInForm";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import SignInFormCompany from "../components/SignInFormCompany";
import Box from "@mui/material/Box";

function SignIn() {
    return (
      <Box sx = {{mt : 20}}>
        <SignInForm ></SignInForm>
      </Box>
    );
}

export default SignIn;
