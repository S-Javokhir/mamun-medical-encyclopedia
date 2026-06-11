import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./routes/__root";
import Dashboard from "./routes/index";
import ArticleView from "./routes/article.$id";
import ProfessorProfile from "./routes/professor.$id";
import Glossary from "./routes/glossary";
import Departments from "./routes/departments";
import LibraryCategory from "./routes/library.$id";
import AdminLayout from "./routes/admin";
import AdminDashboard from "./routes/admin.index";
import AdminArticles from "./routes/admin.articles";
import AdminArticleNew from "./routes/admin.articles.new";
import AdminArticleEdit from "./routes/admin.articles.edit";
import AdminGlossary from "./routes/admin.glossary";
import AdminCategories from "./routes/admin.categories";
import LoginPage from "./routes/login";
import { ScrollToTop } from "./components/ScrollToTop";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library/:id" element={<LibraryCategory />} />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="/professor/:id" element={<ProfessorProfile />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/new" element={<AdminArticleNew />} />
            <Route path="articles/edit/:id" element={<AdminArticleEdit />} />
            <Route path="glossary" element={<AdminGlossary />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="professors" element={<div>Professorlar (Tez orada)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
