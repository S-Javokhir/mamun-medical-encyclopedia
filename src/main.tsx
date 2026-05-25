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
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
