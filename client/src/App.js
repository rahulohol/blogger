import logo from "./logo.svg";
import "./App.css";
import Login from "./components/account/Login";
import { Box } from "@mui/material";

function App() {
  return (
    <Box style={{ marginTop: 64 }}>
      <Login />
    </Box>
  );
}

export default App;
