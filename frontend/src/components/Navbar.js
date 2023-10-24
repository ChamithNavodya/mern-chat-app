import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("tokenStore"));

  const logOut = () => {
    localStorage.removeItem("tokenStore");
    window.location.reload();
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("tokenStore");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <nav className="flex justify-center">
      <div className="flex justify-between items-center bg-white shadow-md py-2 px-8 w-full max-w-2xl mx-2 rounded-b-2xl">
        <Link to="/">
          <h2 className="text-xl font-bold ">Chat App</h2>
        </Link>
        <div>
          {token ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link to="/login">
              <p className="font-semibold text-base rounded-xl bg-slate-200 px-3 py-0.5 shadow-sm">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
