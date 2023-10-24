import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  // const [isLogged, setIsLogged] = useState(null)
  // const logIn = () => {
  //   setIsLogged(true);
  // };
  // const logOut = () => {
  //   setIsLogged(false);
  // };

  return (
    <div className="max-w-2xl md:mx-auto border-2 bg-purple-400/10 border-neutral-200 mt-1 rounded-lg p-2 min-h-[600px] mx-1">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" exact />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import axios from "axios";
// import Login from "./components/Login";
// import Messages from "./components/Messages";
// import { useState } from "react";

// function App() {
//   const [isLogin, setIsLogin] = useState(false);

//   return <div className="App">{isLogin ? <Messages /> : <Login />}</div>;
// }

// export default App;
