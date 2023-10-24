import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      navigate("/");
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <section className="mt-9">
      <div className="flex flex-col justify-around items-center mx-4">
        <h2 className="text-xl font-bold self-center">Login</h2>
        <form className="flex flex-col justify-around w-full md:mx-12 mt-3">
          <input
            type="text"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            required
            autoComplete="true"
            onChange={handleInputChange}
            value={user.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          {err && <p className="text-sm text-red-500">*{err}</p>}
          <button
            type="submit"
            onClick={submit}
            className="my-3 self-center font-semibold max-w-[200px] w-full text-base rounded-xl bg-slate-200 px-3 py-0.5 shadow-sm"
          >
            {isLoading ? "Logging" : "Login"}
          </button>
          <p className="self-center">or</p>

          <Link
            to="/register"
            className="my-3 self-center text-center max-w-[200px] font-semibold w-full text-base rounded-xl bg-slate-200 px-3 py-0.5 shadow-sm"
          >
            Register
          </Link>
        </form>
      </div>
    </section>
  );
}
