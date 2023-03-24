import React from "react";
import SignInForm from "../components/SignInForm";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import SignInFormCompany from "../components/SignInFormCompany";

function SignIn() {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };
  if (checked === true) {
    return (
      <div>
        <Typography sx={{ mt: 20 }}>Login as Employee</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          name = "switch"
        />
        <SignInForm></SignInForm>
      </div>
    );
  } else {
    return (
      <div>
        <Typography sx={{ mt: 20 }}>Login as Company</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <SignInFormCompany></SignInFormCompany>
      </div>
    );
  }
}

export default SignIn;
