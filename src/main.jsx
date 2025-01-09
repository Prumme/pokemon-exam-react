import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./templates/Pokedex";
import MainLayout from "./Layout/MainLayout";
import Pokemon from "./templates/Pokemon";
import "./index.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);