import { Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Notifications from "./routes/Notifications";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default App;
