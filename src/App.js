import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import Teacher from "./pages/teacher/Teacher";
import Parent from "./pages/parent/Parent";
import Student from "./pages/student/Student";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import Login from "./pages/login/Login";

function App() {
  const ProtectedRoute = ({ children }) => {
    return children;
  };
  const Layout = () => {
    return (
      <div style={{display: 'flex'}}>
        <LeftBar/>
        <div style={{flex: 5}}>
          <NavBar/>
          <Outlet />
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/teacher",
          element: <Teacher />,
        },
        {
          path: "/parent",
          element: <Parent />,
        },
        {
          path: "/student",
          element: <Student />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
