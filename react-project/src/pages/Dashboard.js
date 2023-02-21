import job_postings from "../job_postings.json";
import JobPosting from "../components/JobPosting";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {

  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
const firstName = localStorage.getItem("firstName");
console.log(firstName);
function Dashboard() {


  return (
    <div>
      <h1 style={{ marginTop: 80 }}>Welcome back {firstName} </h1>
      <h1>Dashboard</h1>
      <h4>
        This is the dashboard page. It will display a list of job postings that
        a user can apply to.
      </h4>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            p: 10,
            marginTop: 80,
            bgcolor: "background.paper",
            maxWidth: 1200,
            height: 300,
            borderRadius: 10,
          }}
        >
          {job_postings.map((job_posting) => (
            <JobPosting data={job_posting} key={job_posting.id} />
          ))}
        </Box>
    </div>
  );
}

export default Dashboard;
