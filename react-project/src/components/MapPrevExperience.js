function work(work_in) {
  
    console.log(work.Start);
    
    return (<Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="workExperience"
                  required
                  fullWidth
                  id="workExperience"
                  label="Work Experience"
                  defaultValue={work_in.Company}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateStarted"
                  required
                  fullWidth
                  id="dateStarted"
                  label="Date Started"
                  type="date"
                  defaultValue={work_in.Start}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateCompleted"
                  fullWidth
                  id="dateCompleted"
                  label="Date Completed"
                  type="date"
                  defaultValue={work_in.End}
                />
              </Grid>
            </Grid>);
}