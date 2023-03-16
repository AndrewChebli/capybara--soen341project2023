import React from "react";
import SignUpForm from "../components/SignUpForm";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import SignUpFormCompany from "../components/SignUpFormCompany";

function SignUp() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };
  if (checked === true) {
    return (
      <div>
        <Typography variant = "h3" sx={{ mt: 20 }}>SignUp as Employee</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <SignUpForm></SignUpForm>
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="h3" sx={{ mt: 20 }}>SignUp  as Company</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <SignUpFormCompany></SignUpFormCompany>
      </div>
    );
  }
}

export default SignUp;
