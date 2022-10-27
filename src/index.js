import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const activeChainId = ChainId.Mainnet;

const chainRpcConfig = process.env.INFURA_API_KEY && process.env.INFURA_API_KEY.length > 0
    ? {[ChainId.Mainnet]: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`}
    : {};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId} chainRpc={chainRpcConfig}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
