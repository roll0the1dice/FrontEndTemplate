import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./components/AuthProvider.tsx";
import { ConfigProvider } from "antd";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
    </AuthProvider>
  </BrowserRouter>
);
