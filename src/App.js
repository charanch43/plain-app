import React, { useEffect, useState } from "react";

function App() {
  const [extensionData, setExtensionData] = useState(null);

  // Listen for responses from the extension
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source !== window) return;

      const { type, data } = event.data;

      if (type === "FROM_EXTENSION") {
        console.log("Data received from extension:", data);
        setExtensionData(data);
      }
    };

    console.log(extensionData);

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const requestExtensionData = () => {
    window.postMessage({ type: "FROM_WEBPAGE", request: "getStoredData" }, "*");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Safari Extension Bridge</h1>
      <button onClick={requestExtensionData}>Get Data from Extension</button>
      <pre style={{ marginTop: 20 }}>
        {extensionData
          ? JSON.stringify(extensionData, null, 2)
          : "No data received yet."}
      </pre>
    </div>
  );
}

export default App;
