import { useNavigate } from "react-router-dom";
import Navabar from "../Components/Navabar";
import { useState } from "react";
import { toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { login } from "@/Redux/thunk/auth";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(login(form));
      console.log(result);
      toast.success("User Login Success"); 
      navigate('/add-project')
    } 
    catch (error) {
      console.log(error.message)
      toast.error(error.message || "User Login faild");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0f9ff] min-h-screen flex flex-col">
      <Navabar />
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to manage your engineering workflow.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-[#0369A9] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center">
              <Checkbox {...label} defaultChecked />
              <label
                htmlFor="remember"
                className=" text-sm text-slate-600 font-medium cursor-pointer"
              >
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer text-center text-sm"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            Don't have an account yet?
            <span
              onClick={() => navigate("/register")}
              className="text-[#0369A9] font-bold hover:underline cursor-pointer"
            >
              Sign up for free
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
