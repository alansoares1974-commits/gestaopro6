import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { autoSync } from "./utils/autoSync";

// Iniciar sincronização automática com servidor externo

createRoot(document.getElementById("root")!).render(<App />);
