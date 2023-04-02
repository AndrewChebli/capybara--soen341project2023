import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const theme = createTheme();

function EducationBox(props) {
  const [education, setEducation] = React.useState({
    start: "",
    end: "",
    school: "",
    degree: "",
  });

  const [skills, setSkills] = React.useState([""]);

  const addSkill = () => {
    let data = [...skills];
    data.push("");
    setSkills(data);
    props.handleSkills(skills);
  };

  const removeSkill = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setSkills(data);
    props.handleSkills(skills);
  };

  const handleSkillChange = async (e, index) => {
    let data = [...skills];
    data[index] = e.target.value;
    console.log(data);
     setSkills(data);
     props.handleSkills(skills);

  };

  useEffect(() => {
    props.handleSkills(skills);
  }, [skills, props]);

  const handleSchoolChange = (e) => {
    let data = { ...education };
    data.school = e.target.value;
    setEducation(data);
    props.handleEducation(education);
  };

  const handeDegreeChange = (e) => {
    let data = { ...education };
    data.degree = e.target.value;
    setEducation(data);
    props.handleEducation(education);
  };

  const handleStart = (e) => {
    let data = { ...education };
    data.start = e.target.value;
    setEducation(data);
    props.handleEducation(education);
  };

  const handleEnd = (e) => {
    let data = { ...education };
    data.end = e.target.value;
    setEducation(data);
    props.handleEducation(education);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="stretch">
        <Typography component="h1" variant="h4" margin={2} marginTop={1}>
          Education
        </Typography>
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
            mb: 3,
          }}
        >
          <Grid item xs={"auto"}>
            <Grid container spacing={2}>
              <Grid item xs={"auto"} sm={6}>
                <TextField
                  name="school"
                  required
                  fullWidth
                  id="school"
                  label="School Name"
                  onChange={handleSchoolChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="degree"
                  label="Degree"
                  id="degree"
                  onChange={handeDegreeChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  name="start"
                  required
                  fullWidth
                  id="start"
                  type="date"
                  onChange={handleStart}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  name="end"
                  required
                  fullWidth
                  id="end"
                  type="date"
                  onChange={handleEnd}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 5 }}>
                <Typography
                  component="h1"
                  variant="h4"
                  margin={2}
                  marginTop={1}
                >
                  Skills
                </Typography>
              </Grid>
              <Grid container direction="row">
                {skills.map((skill, index) => (
                  <Grid item xs="auto" key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        name="skill"
                        required
                        id="index"
                        label="Skill"
                        onChange={(event) => handleSkillChange(event, index)}
                        value={skill}
                      />
                      <Box
                        sx={{
                          width: "10px",
                          display: "flex",
                          flexDirection: "column",
                          ml : 2
                        }}
                      >
                        <AddIcon color = "primary" onClick={addSkill} />
                        <RemoveIcon color = "primary" onClick={() => removeSkill(index)} />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EducationBox;
