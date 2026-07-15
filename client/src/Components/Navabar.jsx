import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/slice/authSlice";
import { toast } from "sonner";

const Navabar = ({ isDashboard = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async()=>{
      try {
        await dispatch(logout());
        toast.success("User Logout Successsfully...")
        navigate("/")
      } 
      catch(error) {
        console.log(error.message)
      }
  }


  return (
    <div className={`sticky top-0 z-50 ${isDashboard ? 'bg-transparent' : ''}`}>
      <div className={`flex items-center justify-between w-full h-fit px-6 ${isDashboard ? 'md:px-8' : 'md:px-15 lg:px-23'} py-4 shadow-sm bg-transparent backdrop-blur-md`}>
        {/* Logo */}
        <div onClick={() => navigate("/")} className={`flex gap-2 items-center hover:opacity-90 transition-opacity duration-300 cursor-pointer ${isDashboard ? 'md:hidden' : ''}`}>
          <img src="/logo.png" alt="logo" className="h-8 w-auto" />
          <h1 className="text-[#0369A9] text-2xl font-bold tracking-tight">
            FlowTrack
          </h1>
        </div>

        <div className="hidden lg:block">
          <ul className="flex gap-8">
            <li onClick={() => navigate("/features")} className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-all duration-300 hover:scale-105 cursor-pointer">
              Features
            </li>
            <li onClick={() => navigate("/pricing")} className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-all duration-300 hover:scale-105 cursor-pointer">
              Pricing
            </li>
            <li onClick={() => navigate("/about")} className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-all duration-300 hover:scale-105 cursor-pointer">
              About us
            </li>
            <li onClick={() => navigate("/contact")} className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-all duration-300 hover:scale-105 cursor-pointer">
              Contact us
            </li>
          </ul>
        </div>

        {!user ? (
        <div className="hidden lg:flex gap-6 items-center">
          <span
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-colors duration-300 cursor-pointer"
          >
            Sign In
          </span>
          <button onClick={() => navigate("/register")} className="text-sm px-6 py-2.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[#0284C7] transition-all duration-300 transform active:scale-95 cursor-pointer">
            Start free trail
          </button>
        </div> ) : (
          <div className="hidden lg:flex gap-6 items-center">
            <span
              onClick={() => navigate("/add-project")}
              className="text-sm font-semibold text-slate-600 hover:text-[#0369A9] transition-colors duration-300 cursor-pointer"
            >
              Add Project
            </span>
            <button onClick={handleLogout} className="text-sm px-6 py-2.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[#0284C7] transition-all duration-300 transform active:scale-95 cursor-pointer">
              Logout
            </button>
          </div>
        )}

        {/* Mobile/Tablet Navigation Menu Icon */}
        <div className="block lg:hidden">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open}
            aria-haspopup="true"
            onClick={handleClick}
            className="text-[#0369A9] hover:bg-[#E0F2FE] transition-colors duration-300"
          >
            <FiMenu />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
              paper: {
                className: "mt-2 w-56 rounded-2xl shadow-xl border border-slate-100/50 bg-white/95 backdrop-blur-md overflow-hidden",
                style: {
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }
              },
            }}
          >
            <div className="px-2 py-1.5 flex flex-col gap-1">
              <MenuItem 
                onClick={() => { handleClose(); navigate("/features"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  Features
                </span>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleClose(); navigate("/pricing"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  Pricing
                </span>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleClose(); navigate("/about"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  About us
                </span>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleClose(); navigate("/contact"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  Contact us
                </span>
              </MenuItem>
              
              <div className="h-px bg-slate-100 my-1.5 mx-2" />
              
              {!user ? (<MenuItem 
                onClick={() => { handleClose(); navigate("/login"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  Sign In
                </span>
              </MenuItem>) : (
                <MenuItem 
                onClick={() => { handleClose(); navigate("/add-project"); }}
                className="rounded-lg hover:bg-[#F0F9FF]"
              >
                <span className="w-full text-sm font-semibold text-slate-700 hover:text-[#0369A9] block py-1.5 px-2 cursor-pointer">
                  Add Project
                </span>
              </MenuItem>
              )}

              {!user ? (<div className="px-2 py-1.5">
                <button 
                  onClick={() => { handleClose(); navigate("/register"); }}
                  className="w-full text-center text-sm py-2 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Start free trail
                </button>
              </div> ) : (
                <div className="px-2 py-1.5">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-sm py-2 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
