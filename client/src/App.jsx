import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Features from "./Components/Features";
import Pricing from "./Components/Pricing";
import AddProject from "./Pages/AddProject";
import ViewProjects from "./Pages/ViewProjects";
import Footer from "./Components/Footer";
import ProtactedRoutes from "./Components/ProtactedRoutes";
import DashboardLayout from "./Components/DashboardLayout";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./Redux/thunk/auth";
import { useEffect } from "react";
import SingleProject from "./Pages/SingleProject";
import EditProject from "./Pages/EditProject";
import AddTask from "./Pages/Task/AddTask";
import ViewTask from "./Pages/Task/ViewTask";
import EditTask from "./Pages/Task/EditTask";
import SingleTask from "./Pages/Task/SingleTask";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route path="/features" element={<DashboardLayout><Features /></DashboardLayout>}></Route>

          <Route path="/pricing" element={<DashboardLayout><Pricing /></DashboardLayout>}></Route>

          <Route path="/about" element={<DashboardLayout><About /></DashboardLayout>}></Route>

          <Route path="/contact" element={<DashboardLayout><Contact /></DashboardLayout>}></Route>

          <Route path="/footer" element={<Footer />}></Route>

          <Route
            path="/add-project"
            element={
              <ProtactedRoutes>
                <AddProject />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/manage-projects"
            element={
              <ProtactedRoutes>
                <ViewProjects />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="single-project/:id"
            element={
              <ProtactedRoutes>
                <SingleProject />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/edit-project/:id"
            element={
              <ProtactedRoutes>
                <EditProject />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/add-task/:projectId"
            element={
              <ProtactedRoutes>
                <AddTask />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/view-tasks/:projectId"
            element={
              <ProtactedRoutes>
                <ViewTask />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/edit-task/:id"
            element={
              <ProtactedRoutes>
                <EditTask />
              </ProtactedRoutes>
            }
          ></Route>

          <Route
            path="/single-task/:id"
            element={
              <ProtactedRoutes>
                <SingleTask />
              </ProtactedRoutes>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
