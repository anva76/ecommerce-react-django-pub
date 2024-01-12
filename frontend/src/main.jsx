import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { GlobalProvider } from "./store/context/globalContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="light"
    />
  </React.StrictMode>
)
