import HeaderBar from "../components/HeaderBar";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";

describe("HeaderBar", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<HeaderBar />, div);
  });
});