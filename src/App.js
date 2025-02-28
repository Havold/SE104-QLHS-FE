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
import ListScoreBoard from "./pages/listScoreBoards/ListScoreBoards";
import ListEvents from "./pages/listEvents/ListEvents";
import ListAnnouncements from "./pages/listAnnouncements/ListAnnouncements";
import TeacherProfile from "./pages/teacherProfile/TeacherProfile";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import ListDetailClasses from "./pages/listDetailClasses/ListDetailClasses";
import { useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import Error from "./pages/error/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListGrades from "./pages/listGrades/ListGrades";
import ListStudentsClass from "./pages/listStudentsClass/ListStudentsClass";
import ListSchoolYears from "./pages/listSchoolYears/ListSchoolYears";
import DetailScoreBoard from "./pages/detailScoreBoard/DetailScoreBoard";
import ListSubjectReports from "./pages/listSubjectReports/ListSubjectReports";
import ListSemesterReports from "./pages/listSemesterReports/ListSemesterReports";
import ListRules from "./pages/listRules/ListRules";
import DetailSubjectReport from "./pages/detailSubjectReport/DetailSubjectReport";
import DetailSemesterReport from "./pages/detailSemesterReport/DetailSemesterReport";

const queryClient = new QueryClient();

function App() {
  const [role, setRole] = useState();
  const ProtectedRoute = ({ children }) => {
    const { hasAccessToken, currentUser } = useContext(AuthContext);
    setRole(currentUser?.role.name.toLowerCase());
    console.log(hasAccessToken);

    if (hasAccessToken === null) return <p>Loading...</p>; // Chờ kiểm tra
    return hasAccessToken ? children : <Navigate to="/login" />;
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
        { path: "/error", element: <Error /> },
        {
          path: "/list/teachers",
          element: <ListTeachers />,
        },
        {
          path: "/list/rules",
          element: <ListRules />,
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
          path: "/list/school-years",
          element: <ListSchoolYears />,
        },
        {
          path: "/list/grades",
          element: <ListGrades />,
        },
        {
          path: "/list/detail-classes",
          element: <ListDetailClasses />,
        },
        {
          path: "/list/detail-classes/:id",
          element: <ListStudentsClass />,
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
          path: "/list/score-boards",
          element: <ListScoreBoard />,
        },
        {
          path: "/list/score-boards/:id",
          element: <DetailScoreBoard />,
        },
        {
          path: "/list/subject-reports/:id",
          element: <DetailSubjectReport />,
        },
        {
          path: "/list/subject-reports",
          element: <ListSubjectReports />,
        },
        {
          path: "/list/semester-reports",
          element: <ListSemesterReports />,
        },
        {
          path: "/list/semester-reports/:id",
          element: <DetailSemesterReport />,
        },
        {
          path: "/list/attendance",
          element: <ListScoreBoard />,
        },
        {
          path: "/list/events",
          element: <ListEvents />,
        },
        {
          path: "/list/messages",
          element: <ListScoreBoard />,
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          theme="dark"
          style={{ fontSize: "14px" }}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;
