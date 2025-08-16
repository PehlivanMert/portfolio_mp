import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { cacheManager } from "./utils/cacheManager";

// Initialize cache manager and register service worker
cacheManager.registerServiceWorker();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
