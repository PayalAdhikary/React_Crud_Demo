// App.js
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Layout from "./components/Layout"; // Import the Layout component
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes Wrapped with Layout */}
          <Route element={<Layout />}>
            {/* All these components will have the same layout */}
            <Route index path="/dashboard" element={<PrivateRoute>
                  <HomePage />
                </PrivateRoute>} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
