import SignUp from "../components/SignUp";
import ReactDOM from "react-dom";

describe("SignUp", () => {  
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignUp />, div);
  });
});
