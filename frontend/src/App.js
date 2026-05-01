import React, { useState } from "react";

const BASE_URL = "https://team-task-manager-production-8df1.up.railway.app";

function App() {
  const [token, setToken] = useState("");
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // REGISTER
  const register = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "test",
        email: "test@test.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log("REGISTER RESPONSE:", data);
  };

  // LOGIN
  const login = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@test.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (data.token) {
      setToken(data.token);
    }
  };

  // CREATE PROJECT
  const createProject = async () => {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "My Project",
      }),
    });

    const data = await res.json();
    console.log("PROJECT:", data);

    if (data._id) {
      setProjectId(data._id);
    }
  };

  // CREATE TASK
  const createTask = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        project: projectId, // IMPORTANT FIX
      }),
    });

    const data = await res.json();
    console.log("CREATE TASK:", data);

    setTitle("");
  };

  // LOAD TASKS
  const loadTasks = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("TASKS:", data);

    setTasks(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      <br /><br />

      <button onClick={createProject}>Create Project</button>

      <p>Project ID: {projectId}</p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={createTask}>Add Task</button>
      <button onClick={loadTasks}>Load Tasks</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;