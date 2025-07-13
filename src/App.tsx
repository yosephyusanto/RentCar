import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import UploadCarPage from "./pages/UploadCarPage";
import Layout from "./layouts/Layout";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="history" element={<HistoryPage/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="employee/">
            <Route path="upload" element={<UploadCarPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
