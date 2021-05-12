import React from "react";
import Post from "./Post";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Pagination Task</h1>
      {<Post />}
    </div>
  );
}
