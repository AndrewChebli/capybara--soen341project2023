import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAuth } from "../context/auth-context";

let b64 = sessionStorage.getItem("resume")
  ? sessionStorage.getItem("resume")
  : null;

function EditProfilePage() {
  const [resume, setResume] = useState(
    sessionStorage.getItem("resume") ? sessionStorage.getItem("resume") : null
  );
  const [workExperience, setWorkExperience] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const [bio, setBio] = useState("");

  const [resumeName, setResumeName] = useState(null);

  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
    },
    resumeName: "",
    resume: resume,
    experience: [
      {
        company: "",
        position: "",
        description: "",
        start: "",
        end: "",
      },
    ],
  });

  const handleSkillChange = async (e, index) => {
    let data = [...skills];
    data[index] = e.target.value;
    console.log(data);
    setSkills(data);
  };

  const handlePositionChange = (event, index) => {
    let data = [...workExperience];
    data[index].position = event.target.value;
    setWorkExperience(data);
  };

  const handleCompanyChange = (event, index) => {
    let data = [...workExperience];
    data[index].company = event.target.value;
    setWorkExperience(data);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  const handleDescriptionChange = (event, index) => {
    let data = [...workExperience];
    data[index].description = event.target.value;
    setWorkExperience(data);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  const handleStartChange = (event, index) => {
    let data = [...workExperience];
    data[index].start = event.target.value;
    setWorkExperience(data);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  const handleEndChange = (event, index) => {
    let data = [...workExperience];
    data[index].end = event.target.value;
    setWorkExperience(data);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: "",
        position: "",
        description: "",
        start: "",
        end: "",
      },
    ]);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  const removeWorkExperience = (index) => {
    let data = [...workExperience];
    data.splice(index, 1);
    setWorkExperience(data);
    setEmployeeInfo({
      ...employeeInfo,
      experience: workExperience,
    });
  };

  useEffect(() => {
    async function getEmployeeInfo() {
      let response_from_backend;
      let token =  sessionStorage.getItem("token");
      response_from_backend = await fetch(
        "http://localhost:8080/api/employee/getone/" +
        sessionStorage.getItem("_id"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

          },
        }
      );
      console.log(response_from_backend);
      let response = await response_from_backend.json();
      console.log(response);
      sessionStorage.setItem("resume", response.employee.resume);
      setEmployeeInfo(response.employee);
      setResume(response.employee.resume);
      setResumeName(response.employee.resumeName);
      setWorkExperience(response.employee.experience);
      setSkills(response.employee.skills);
      setBio(response.employee.bio);
    }
    getEmployeeInfo();
  }, []);

  const deleteAccount = async () => {
    let response_from_backend;
    console.log("deleting account");
    response_from_backend = await fetch(
      `http://localhost:8080/api/employee/${sessionStorage.getItem("_id")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    if (response_from_backend.status === 200) {
      sessionStorage.clear();
      alert("Account deleted successfully");
      window.location.href = "/";
    } else if (response_from_backend.status === 500) {
      alert("Error deleting account");
    } else if (response_from_backend.status === 404) {
      alert("Account not found");
    } else {
      alert(response_from_backend.status + " " + response_from_backend);
    }
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setSkills(data);
  };

  function handleResumeChange(event) {
    console.log("click");
    console.log(event.target.files[0]);
    let file = event.target.files[0],
      reader = new FileReader();

    reader.onloadend = function () {
      b64 = reader.result.replace(/^data:.+;base64,/, "");
      console.log(b64);
      setResume(b64);
    };
    reader.readAsDataURL(file);
    console.log("logging b64");
    console.log(file);
    setResumeName(file.name);
    console.log("logging resume");
  }

  let resume_name = resumeName ? resumeName : "No file chosen";

  async function updateService(event) {
    console.log(event.currentTarget);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("sending to : " + sessionStorage.getItem("_id"));
    let response_from_backend = await fetch(
      "http://localhost:8080/api/employee/" + sessionStorage.getItem("_id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          resume: b64,
          resumeName: resumeName,
          education: {
            school: data.get("school"),
            degree: data.get("degree"),
            start: data.get("dateStartedSchool"),
            end: data.get("dateCompletedSchool"),
          },
          experience: workExperience,
          skills: skills,
          bio: data.get("bio"),
        }),
      }
    );
    console.log(response_from_backend);
    let response = await response_from_backend.json();
    console.log(response);
    if (response_from_backend.status === 200) {
      sessionStorage.setItem("resume", response.employee.resume);
      console.log(response.employee);
      alert("Profile Updated");
    } else {
      alert("Profile Update Failed");
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        component="form"
        noValidate
        onSubmit={updateService}
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ p: 2 }}>
          Edit Profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              value={employeeInfo.firstName}
              onChange={(e) => {
                setEmployeeInfo({ ...employeeInfo, firstName: e.target.value });
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={employeeInfo.lastName}
              onChange={(e) => {
                setEmployeeInfo({ ...employeeInfo, lastName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bio"
              label="Bio"
              name="bio"
              value={bio}
              multiline={true}
              rows={4}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 3 }}>
            <label htmlFor="resumeInput">
              <Typography component="h4" variant="h6">
                {`${resume_name}`}{" "}
              </Typography>
              <input
                id="resumeInput"
                name="resume"
                type="file"
                accept=".pdf, .docx"
                hidden
                onChange={handleResumeChange}
              />
              <AttachFileOutlinedIcon
                fontSize="large"
                color="primary"
              ></AttachFileOutlinedIcon>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item xs={"auto"}>
                <Typography component="h1" variant="h4" marginBottom={2}>
                  Work Experience
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {workExperience.map((exp, index) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="position"
                          required
                          fullWidth
                          id="position"
                          label="Position"
                          value={exp.position}
                          onChange={(e) => {
                            handlePositionChange(e, index);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={20}>
                        <TextField
                          name="companyName"
                          required
                          fullWidth
                          id="companyName"
                          label="Company Name"
                          value={exp.company}
                          onChange={(e) => {
                            handleCompanyChange(e, index);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="dateStartedWork"
                          required
                          fullWidth
                          id="dateStartedWork"
                          type="date"
                          value={exp.start}
                          onChange={(e) => {
                            handleStartChange(e, index);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="dateCompletedWork"
                          fullWidth
                          id="dateCompletedWork"
                          type="date"
                          onChange={(e) => {
                            handleEndChange(e, index);
                          }}
                          value={exp.end}
                        />
                      </Grid>
                      <Grid item xs={12} sm={20}>
                        <TextField
                          multiline={true}
                          rows={4}
                          name="description"
                          fullWidth
                          id="description"
                          label="Description"
                          type="text"
                          onChange={(e) => {
                            handleDescriptionChange(e, index);
                          }}
                          value={exp.description}
                        />
                      </Grid>
                    </Grid>
                    <Button onClick={addWorkExperience} sx={{ ml: "84%" }}>
                      <AddCircleIcon />
                    </Button>
                    <Button onClick={() => removeWorkExperience(index)}>
                      <RemoveCircleIcon />
                    </Button>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h4"
                  margin={2}
                  marginTop={6}
                >
                  Skills
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid container spacing={2} direction="column">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <Grid container spacing={1} direction="row" sx = {{ my : 1}}>
                      <Grid item xs={10} >
                        <TextField
                          name="skill"
                          required
                          fullWidth
                          id="skill"
                          label="Skill"
                          value={skill}
                          onChange={(e) => {
                            handleSkillChange(e, index);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1} >
                      <Button onClick={addSkill}>
                        <AddCircleIcon />
                      </Button>
                      </Grid>
                      <Grid item xs={1} >
                      <Button onClick={() => removeSkill(index)}>
                        <RemoveCircleIcon />
                      </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4" margin={2} marginTop={6}>
              Education
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
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
                      value={employeeInfo.education.school}
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          education: {
                            ...employeeInfo.education,
                            school: e.target.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="degree"
                      label="Degree"
                      id="degree"
                      value={employeeInfo.education.degree}
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          education: {
                            ...employeeInfo.education,
                            degree: e.target.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="dateStartedSchool"
                      required
                      fullWidth
                      id="dateStartedSchool"
                      type="date"
                      value={employeeInfo.education.start}
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          education: {
                            ...employeeInfo.education,
                            start: e.target.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="dateCompletedSchool"
                      fullWidth
                      id="dateCompletedSchool"
                      type="date"
                      value={employeeInfo.education.end}
                      onChange={(e) => {
                        setEmployeeInfo({
                          ...employeeInfo,
                          education: {
                            ...employeeInfo.education,
                            end: e.target.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Grid>
      </Box>
      <Box sx={{ pt: 15 }}>
        <Button onClick={deleteAccount} color="error" variant="contained">
          {" "}
          Delete Account{" "}
        </Button>
      </Box>
    </Container>
  );
}

export default EditProfilePage;
