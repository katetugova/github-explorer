import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import UserPage from "./pages/userPage/UserPage";
import RepoPage from "./pages/repoPage/RepoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/user/:username/:repo" element={<RepoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;