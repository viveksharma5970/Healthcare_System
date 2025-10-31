import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Loader } from "lucide-react"
import { useAuthStore } from "./stores/authStore.js"
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Mappings from "./components/Dashboard/Mapping.jsx";
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import Doctors from "./components/Dashboard/Doctor.jsx";
import Patients from "./components/Dashboard/Patients.jsx";
import { useEffect } from "react";

function App() {
  const { authUser, authCheck, ischeckingAuth } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (ischeckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* <Route path="/" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} /> */}

        <Routes>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/dashboard/doctors" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/dashboard/doctors" />}
          />

          {/* Nested Dashboard Routes */}
          <Route
            path="/dashboard"
            element={authUser ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="mappings" element={<Mappings />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
