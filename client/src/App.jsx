// Libraries
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//actions redux
import { getCourses, getRanking, Create, CreateReco,getReco } from "../redux/actions";
import { Base, Reco} from "../CursosBases"


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
import CourseDetailPage from "./components/courseDetailPage/course/course";
import LessonPage from "./components/lessonPage/lessonPage";
import UsersPage from "./components/adminPages/usersPage/usersPage";
import PaymentGateway from "./components/paymentGateway/paymentGateway.jsx";

// styles
import style from "./index.modules.css";
import Prices from "./components/Prices/prices";
import ChangePassw from "./components/ChangePassword/Change";
import NotFound from "./NotFound/NotFound";
import About from "./components/AboutUs/About";

function App() {
  const theme = useSelector((store) => store.theme);
  const isLogged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    getRanking()(dispatch);
    Reco.map(async (e) => await CreateReco(e)())
    Base.map(async (e) => await Create({ ...e, lessons: [] }, e.lessons)()) //EJECUTAR SOLO LA PRIMERA VEZ QUE LO USAS para generar los modelos de curso en la base de datos (procura limpiar la base de datos antes)
    getReco()(dispatch);
  });

  const AppLayout = () => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  );

  return (
    <div className={style.AppBody}>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/passwordreset/:token" element={<ChangePassw />} />
        <Route path="/Pagar" element={<PaymentGateway />} />
        <Route path="/AboutUs" element={<About />} />
        <Route element={<PrivateRoute isLogged={isLogged} />}>
          <Route path="/course/:idCourse/:idLesson" element={<LessonPage />} />
          <Route path="/precios" element={<Prices />} /> 
          <Route path="/Pagar/:Time" element={<PaymentGateway />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home theme={theme} user={user} />} />
          <Route path="/courses" element={<Courses theme={theme} />}></Route>
          <Route
            path="/course/:id"
            element={<CourseDetailPage theme={theme} />}
          />
          <Route element={<PrivateRoute isLogged={isLogged} />}>
            <Route path="/perfil" element={<Perfil theme={theme} />} />
              <Route path="/favoritos" element={<Courses theme={theme} detail={user.courses} />}></Route>
          </Route>
          <Route element={<PrivateAdminRoute isAdmin={user.isAdmin} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
        <Route path="/:other" element={<NotFound btn={true}/>} />
        <Route path="/:other/:otro" element={<NotFound btn={true}/>} />
        <Route path="/:other/:otro/:otracos" element={<NotFound btn={true}/>} />
      </Routes>
    </div>
  );
}

export default App;
