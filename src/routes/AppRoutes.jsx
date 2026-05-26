import { Routes, Route } from "react-router-dom";

import QueryPage from "../pages/QueryPage";
import PostFAQPage from "../pages/PostFAQPage";
import FAQManagementPage from "../pages/FAQManagementPage";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<QueryPage />}
      />

      <Route
        path="/post-query"
        element={<PostFAQPage />}
      />

      <Route
        path="/admin"
        element={<FAQManagementPage />}
      />

    </Routes>
  );
}

export default AppRoutes;