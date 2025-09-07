import { Routes, Route } from "react-router-dom";
import "./App.css";
import ArticleCarousel from "./components/ArticleCarousel";
import Navbar from "./components/Navbar/Navbar";
import Notifications from "./components/Notifications/Notifications";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<ArticleCarousel />} />
        <Route path="/notifications" element={Notifications} />
      </Route>
    </Routes>
  );
}

export default App;
