import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const LevelContext = React.createContext({ finnished: false });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LevelContext.Provider value={{ finnished: false }}>
      <App />
    </LevelContext.Provider>
  </React.StrictMode>
);
