import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      setisLoading(true);
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post("/users/register", {
        email: user.email,
        password: user.password,
        username: user.username,
        phoneNumber: user.phoneNumber,
      });
      setUser({ email: "", password: "", username: "", phoneNumber: "" });
      
    } catch (error) {
      setErr(error.response.data.msg)
    } finally {
      setisLoading(false);
      navigate("/login")
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
        <h2 className="text-xl font-bold self-center">Signup</h2>
        <form className="flex flex-col justify-around w-full md:mx-12 mt-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={user.username}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={user.phoneNumber}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="true"
            onChange={handleInputChange}
            value={user.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 my-2"
          />
          <button
            type="submit"
            onClick={submit}
            className="my-3 self-center font-semibold max-w-[200px] w-full text-base rounded-xl bg-slate-200 px-3 py-0.5 shadow-sm"
          >
            {isLoading ? "Registering" : "Register"}
          </button>
          {err && <p className="text-sm text-red-500">*{err}</p>}
        </form>
      </div>
    </section>
  );
}
