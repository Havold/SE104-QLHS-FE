import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import Teacher from "./pages/teacher/Teacher";
import Parent from "./pages/parent/Parent";
import Student from "./pages/student/Student";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import Login from "./pages/login/Login";
import ListTeachers from "./pages/ListTeachers/ListTeachers";
import ListStudents from "./pages/ListStudents/ListStudents";
import ListParents from "./pages/ListParents/ListParents";
import ListSubjects from "./pages/ListSubjects/ListSubjects";

function App() {
  const ProtectedRoute = ({ children }) => {
    return children;
  };
  const Layout = () => {
    return (
      <div className="h-screen flex">
        <LeftBar className='w-[14%] md:w-[15%] lg:w-[16%] xl:w-[14%] p-2'/>
        <div className='flex flex-col w-[86%] md:w-[85%] lg:w-[84%] xl:w-[86%]'>
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
        {
          path: '/list/teachers',
          element: <ListTeachers/>
        },
        {
          path: '/list/students',
          element: <ListStudents/>
        },
        {
          path: '/list/parents',
          element: <ListParents/>
        },
        {
          path: '/list/subjects',
          element: <ListSubjects/>
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
