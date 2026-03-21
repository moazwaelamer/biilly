import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { Toaster } from "react-hot-toast";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a"
        }
      }}
    />

    <RouterProvider router={router} />
  </>
);// في نهاية ملف الـ main (الموجود في الكود بتاعك)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // التأكد أن المسار يبدأ بـ / ومعناه أنه سيبحث عنه في فولدر public
    navigator.serviceWorker.register('/sw.js');
  });
}