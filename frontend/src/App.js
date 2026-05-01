import React, { useEffect } from "react";
import BASE_URL from "./api";

function App() {
  useEffect(() => {
    fetch(`${BASE_URL}/api/tasks`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Frontend Connected</h1>;
}

export default App;