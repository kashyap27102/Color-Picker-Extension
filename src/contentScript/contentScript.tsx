import React from "react";
import ReactDOM from "react-dom/client";

const App: React.FC<{}> = () => {
  return <div>Hello World</div>;
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
