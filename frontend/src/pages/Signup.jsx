import { Link, useNavigate } from "react-router-dom";
import register_bg from "../assets/image/register_background.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, registerUser } from "../redux/user/authSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, error, loading } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearError());
  },[dispatch])

  useEffect(() => {
    if (user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username || !password) {
      alert("Please fill all fields");
      return;
    }
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-5 pb-16"
      style={{ backgroundImage: `url(${register_bg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 md:ml-20 mt-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-gray-900/85 text-gray-100 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-400">Gym Zone</h2>
            <p className="text-sm text-gray-400 mt-2">
              Create your account and start your journey!
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-red-400">
              {typeof error === "string" ? error : error?.message || "Registration failed"}
            </p>
          )}

          <button
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-all duration-200 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="mt-5 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
