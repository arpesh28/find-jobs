import { Route, Routes, BrowserRouter } from "react-router-dom";

//  Routes
import Home from "features/home";
import Details from "features/details";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
