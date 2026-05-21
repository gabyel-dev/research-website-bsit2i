import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.js";
import { Login } from "./pages/Login.js";
import { Upload } from "./pages/Upload.js";
import { ViewAllResearches } from "./pages/ViewAllResearches.js";
import { MyResearches } from "./pages/MyResearches.js";
import { NotFound } from "./pages/NotFound.js";
import { ProtectedRoute } from "./routes/ProtectedRoute.js";
import { PublicRoute } from "./routes/PublicRoute.js";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/researches" element={<ViewAllResearches />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-researches"
        element={
          <ProtectedRoute>
            <MyResearches />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
