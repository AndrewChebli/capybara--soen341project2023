import JobPosting from "../components/JobPosting";
import ReactDOM from "react-dom";
import jobpostings from "../job_postings.json";

let jobposting = jobpostings[0];
describe("JobPosting", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<JobPosting data = {jobposting} />, div);
  });
  });
