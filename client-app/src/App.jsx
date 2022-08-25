// Libraries

import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// compoents
import Home from "./components/home/home";
import Aside from "./components/home/aside/aside";
import NavBarUser from "./components/home/navbarUser/navBarUser";
import Login from "./components/login/login";
import Courses from "./components/courses/courses";
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Perfil from "./components/perfil/perfil";
import PrivateRoute from "./components/privateRoute/privateRoute";
import PrivateAdminRoute from "./components/privateRoute/privateAdminRoute";
import CourseDetail from "./components/courseDetailPage/courseDetail.jsx";
import LessonPage from "./components/lessonPage/lessonPage";
import UsersPage from "./components/adminPages/usersPage/usersPage";
import PaymentGateway from "./components/paymentGateway/paymentGateway.jsx";
import Success from "../src/components/paymentGateway/success/success";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import Playground from "./components/playground/playground";

// styles
import style from "./index.modules.css";

function App() {
  const theme = useSelector((state) => state.reducerCompleto.theme);
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const user = useSelector((state) => state.reducerCompleto.user);
  const token = useSelector((state) => state.reducerCompleto.authToken);

  const AppLayout = () => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  );

console.log(user)

  return (
    <div className={style.AppBody}>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/resetpassword/:token" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home theme={theme} />} />
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/course/:id" element={<CourseDetail theme={theme} />} />
          <Route element={<PrivateRoute isLogged={isLogged} />}>
            <Route path="/perfil" element={<Perfil theme={theme} />} />
            <Route path="/playground" element={<Playground />} />
            <Route
              path="/course/:idCourse/:idLesson"
              element={<LessonPage theme={theme} />}
            />
            <Route path="/pay" element={<PaymentGateway />} />
            <Route path="/success/:id" element={<Success />} />
          </Route>
          <Route element={<PrivateAdminRoute isAdmin={user.isAdmin} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
