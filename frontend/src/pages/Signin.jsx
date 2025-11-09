import { Link } from "react-router-dom";
import login_bg from "../assets/image/login_background.jpg";

const Signin = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end pt-5 pb-16"
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 md:mr-20 mt-4 flex justify-center">
        <form className="w-full bg-gray-900/85 text-gray-100 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-400">Welcome Back!</h2>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to continue your fitness journey
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-all duration-200"
            type="submit"
          >
            Log In
          </button>

          <p className="mt-5 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
