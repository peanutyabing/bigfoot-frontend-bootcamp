import { Outlet } from "react-router-dom";
import "./App.css";
import SightingSummary from "./Components/SightingSummary.js";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SightingSummary />
      </header>
      <Outlet />
    </div>
  );
}
