import { Routes, Route } from "react-router-dom";

import QueryPage from "../pages/QueryPage";
import PostFAQPage from "../pages/PostFAQPage";
import FAQManagementPage from "../pages/FAQManagementPage";
import QuestionPage from "../pages/QuestionPage";

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

      <Route
      path="/question"
      element={<QuestionPage />}
      />

    </Routes>
  );
}

export default AppRoutes;