import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from './context/AuthContext';

import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import InventoryPage from "./pages/InventoryPage";
import WorkspacePage from "./pages/WorkspacePage";
import PlannerPage from "./pages/PlannerPage";
import TransactionPage from "./pages/TransactionPage";
function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <LogInPage />} />
        <Route path="/signup" element={authUser ? <HomePage/> : <SignUpPage />} />
        <Route path="/login" element={authUser ? <HomePage/> : <LogInPage />} />
        <Route path="/inventory" element={authUser ? <InventoryPage /> : <LogInPage/>} />
        <Route path="/workspace" element={authUser ? <WorkspacePage /> : <LogInPage/>} />
        <Route path="/planner" element={authUser ? <PlannerPage /> : <LogInPage/>} />
        <Route path="/transaction" element={authUser ? <TransactionPage /> : <LogInPage/>} />
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
