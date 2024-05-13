import { Toaster } from 'react-hot-toast'

import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import InventoryPage from "./pages/InventoryPage";
import WorkspacePage from "./pages/WorkspacePage";
import PlannerPage from "./pages/PlannerPage";
import TransactionPage from "./pages/TransactionPage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
      <Toaster 
        toastOptions={{
          error: {
            duration: 2000
          },
          success: {
            duration: 1000
          }
        }}
      />
    </>
  );
}

export default App;
