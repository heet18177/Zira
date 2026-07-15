import { useNavigate } from "react-router-dom";
import Navabar from "../Components/Navabar";
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { register } from "@/Redux/thunk/auth";

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form , setForm] = useState({
    name:"",
    email:"",
    password:"",
  })
  const [loading , setLoading] = useState(false)

  const handleRegister = async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
    
      dispatch(register(form));
      navigate('/add-project')

    }
    catch(error){
      toast.error(error.response.data.message);
    }

    finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#f0f9ff] min-h-screen flex flex-col">
      <Navabar />
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e)=>setForm({...form,name:e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e)=>setForm({...form,password:e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center">
               <Checkbox {...label} defaultChecked required/>
              <label htmlFor="terms" className="text-xs text-slate-600 font-medium cursor-pointer leading-normal">
                I agree to the
                <a href="#" className="text-[#0369A9] font-bold hover:underline">
                  Terms of Service
                </a>
                and
                <a href="#" className="text-[#0369A9] font-bold hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer text-center text-sm"
            >
              {loading ? <CircularProgress size={24} color="inherit"/> : "Get started free"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-[#0369A9] font-bold hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;