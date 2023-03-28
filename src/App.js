import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bigfoot sightings</h1>
        <Outlet />
      </header>
    </div>
  );
}
