import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Article from "./components/Article";
import EmblaCarousel from "./components/EmblaCarousel";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <EmblaCarousel></EmblaCarousel>
    </div>
  );
}

export default App;
