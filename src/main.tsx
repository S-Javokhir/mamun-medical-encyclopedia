import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./routes/__root";
import Dashboard from "./routes/index";
import ArticleView from "./routes/article.$id";
import ProfessorProfile from "./routes/professor.$id";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="/professor/:id" element={<ProfessorProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
