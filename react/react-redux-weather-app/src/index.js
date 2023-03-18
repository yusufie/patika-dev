import React from "react";
import { createRoot } from 'react-dom/client';
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
