import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import Teacher from "./pages/teacher/Teacher";
import Parent from "./pages/parent/Parent";
import Student from "./pages/student/Student";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import Login from "./pages/login/Login";
import ListTeachers from "./pages/listTeachers/ListTeachers";
import ListStudents from "./pages/listStudents/ListStudents";
import ListParents from "./pages/listParents/ListParents";
import ListSubjects from "./pages/listSubjects/ListSubjects";
import ListClasses from "./pages/listClasses/ListClasses";
import ListLessons from "./pages/listLessons/ListLessons";
import ListExams from "./pages/listExams/ListExams";
import ListAssignments from "./pages/listAssignments/ListAssignments";
import ListResults from "./pages/listResults/ListResults";
import ListEvents from "./pages/listEvents/ListEvents";
import ListAnnouncements from "./pages/listAnnouncements/ListAnnouncements";
import TeacherProfile from "./pages/teacherProfile/TeacherProfile";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import ListDetailClasses from "./pages/listDetailClasses/ListDetailClasses";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Error from "./pages/error/Error";

function App() {
  const { hasAccessToken, currentUser } = useContext(AuthContext);
  const role = currentUser?.role.name.toLowerCase();
  const ProtectedRoute = ({ children }) => {
    if (!hasAccessToken) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const Layout = () => {
    return (
      <div className="h-screen flex">
        <LeftBar className="w-[14%] md:w-[15%] lg:w-[16%] xl:w-[14%] p-2" />
        <div className="flex flex-col w-[86%] md:w-[85%] lg:w-[84%] xl:w-[86%]">
          <NavBar />
          <Outlet />
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
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
          path: "/",
          element: role === "admin" ? <Admin /> : <Student />,
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
        { path: "/error", element: <Error /> },
        {
          path: "/list/teachers",
          element: <ListTeachers />,
        },
        {
          path: "/list/teachers/:id",
          element: <TeacherProfile />,
        },
        {
          path: "/list/students/:id",
          element: <StudentProfile />,
        },
        {
          path: "/list/students",
          element: <ListStudents />,
        },
        {
          path: "/list/parents",
          element: <ListParents />,
        },
        {
          path: "/list/subjects",
          element: <ListSubjects />,
        },
        {
          path: "/list/classes",
          element: <ListClasses />,
        },
        {
          path: "/list/detail-classes",
          element: <ListDetailClasses />,
        },
        {
          path: "/list/lessons",
          element: <ListLessons />,
        },
        {
          path: "/list/exams",
          element: <ListExams />,
        },
        {
          path: "/list/assignments",
          element: <ListAssignments />,
        },
        {
          path: "/list/results",
          element: <ListResults />,
        },
        {
          path: "/list/attendance",
          element: <ListResults />,
        },
        {
          path: "/list/events",
          element: <ListEvents />,
        },
        {
          path: "/list/messages",
          element: <ListResults />,
        },
        {
          path: "/list/announcements",
          element: <ListAnnouncements />,
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
