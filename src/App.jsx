import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import StudentList from "./pages/student/Student";
import EditStudent from "./pages/single/EditStudent";
import StudentForm from "./pages/forms/StudentForm";
import CourseForm from "./pages/forms/CourseForm";
import TutorForm from "./pages/forms/TutorForm";
import TutorList from "./pages/tutor/Tutor";
import Courses from "./pages/courses/Courses";
import Payment from "./pages/payment/Payment";
import Manage from "./pages/manage/Manage";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import EditTutor from "./pages/single/EditTutor";
import { useRecoilValue } from 'recoil'
import { userState } from './components/atom/UserAtom'
import EditCourse from "./pages/single/EditCourse";
// import user from "./components/auth/Signin"
// import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const user = useRecoilValue(userState)
  // const googleAuth = useRecoilValue(userState)
  return (
    <div className="app">
      {/* <GoogleOAuthProvider clientId="786206504737-4r0gcofs85jnsbhso0d7pr3ag4ilm1fn.apps.googleusercontent.com"> */}
      <Router>

        {user.email ?
          <>
            <Navbar />
            <Sidebar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route exact path="student" element={<StudentList />} />
                <Route exact path="student/:id" element={<EditStudent />} />
                <Route exact path="enquiries" element={<StudentForm />} />
                <Route exact path="tutor" element={<TutorList />} />
                <Route exact path="tutor/:id" element={< EditTutor />} />
                <Route exact path="tutor-form" element={<TutorForm />} />
                <Route exact path="courses" element={<Courses />} />
                <Route exact path="courses/:id" element={<EditCourse />} />
                <Route exact path="course-form" element={<CourseForm />} />
                <Route exact path="payments" element={<Payment />} />
                <Route exact path="manage" element={<Manage />} />
              </Routes>
            </div>
          </>
          :
          <>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>

            </Routes>
          </>


        }

      </Router>
      {/* </GoogleOAuthProvider> */}

    </div>
  );
}

export default App;
