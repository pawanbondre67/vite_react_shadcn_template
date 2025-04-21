
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signUp/SignUp";
import TableDemo from "./components/Table";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import NotFound from "./components/NOT_FOUND";




const App = () => {
  return (
  <Routes>
  <Route path="/" element={<Layout /> }>

{/* public routes */}
<Route path="login" element={<Login />} /> 
<Route path="signup" element={<Signup />} />


{/* ProtectedRoute */}
<Route element={<PersistLogin />}  >
<Route element={<RequireAuth/>}  >
<Route path="/" element={<TableDemo /> } />
</Route>
</Route>

{/* missing routes */}

<Route path="*" element={<NotFound />}  />
  </Route>
  </Routes>
       
  );
};

export default App;
