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
import LocationPage from './pages/LocationPage';
import PlannerHistoryPage from './pages/PlannerHistoryPage';
import DashboardHomePage from './pages/DashboardHomePage';
import DashboardAccountingPage from './pages/DashboardAccountingPage';
import DashboardMonthlyPage from './pages/DashboardAccoutingMonthlyPage';
import PlannerCompletedPage from './pages/PlannerCompletedPage';

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
        <Route path="/planner/:id" element={authUser ? <PlannerPage /> : <LogInPage/>} />
        <Route path="/planner/history" element={authUser ? <PlannerHistoryPage /> : <LogInPage/>} />
        <Route path="/planner/history/planner/completed/:id" element={authUser ? <PlannerCompletedPage /> : <LogInPage/>} />
        <Route path="/transaction/:id" element={authUser ? <TransactionPage /> : <LogInPage/>} />
        <Route path="/location" element={authUser ? <LocationPage /> : <LogInPage/>} />
        <Route path="/dashboard" element={authUser ? <DashboardHomePage /> : <LogInPage/>} />
        <Route path="/dashboard/accounting" element={authUser ? <DashboardAccountingPage /> : <LogInPage/>} />
        <Route path="/dashboard/accounting/specificMonth" element={authUser ? <DashboardMonthlyPage /> : <LogInPage/>} />
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
