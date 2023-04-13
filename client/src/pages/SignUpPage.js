import React from "react";
import SignUpForm from "../components/SignUpForm";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import SignUpFormCompany from "../components/SignUpFormCompany";
import SinUpAdmin from "../components/SignUpAdmin";
import { Box } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect } from "react";


function SignUp() {
  const [checked, setChecked] = React.useState(0);


  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        m: 1,
        mt: 20
      },
    }}
  >

<ButtonGroup variant="text" aria-label="text button group" >
        <Button onClick = {() => setChecked(0)}>Employee</Button>
        <Button onClick = {() => setChecked(1)}>Company</Button>
        <Button onClick = {() => setChecked(2)}>Admin</Button>
      </ButtonGroup>
      
      <Box sx = {{width: '50%', mt : 5}}>
      {checked === 0 && <SignUpForm />}
      {checked === 1 && <SignUpFormCompany />}
      {checked === 2 && <SinUpAdmin />}
      </Box>
    </Box>
  );

}

export default SignUp;
