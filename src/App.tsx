import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import UploadCarPage from "./pages/employee/UploadCarPage";
import Layout from "./layouts/Layout";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ManageCarPage from "./pages/employee/ManageCarPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          {/* Menggunakan Layout yaitu terdapat navbar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route
              path="employee/"
              element={<ProtectedRoute requiredRole="employee" />}
            >
              <Route path="manage-cars" element={<ManageCarPage />} />
              <Route path="upload" element={<UploadCarPage />} />
            </Route>
          </Route>

          {/* Tidak menggunakan layout yaitu tidak terdapat navbar */}
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
