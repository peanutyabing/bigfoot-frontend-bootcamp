import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar.js";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Outlet />
      </header>
    </div>
  );
}
