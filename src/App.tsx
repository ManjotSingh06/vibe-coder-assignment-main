import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/features/search/pages/SearchPage";
import { ProfileDetailPage } from "@/features/profile/pages/ProfileDetailPage";
import ComparePage from "@/features/compare/pages/ComparePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
