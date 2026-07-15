
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();

  const words = ["Faster.", "Confidently", "Securely."];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const updatedText = currentWord.substring(0, text.length + 1);
          setText(updatedText);

          if (updatedText === currentWord) {
            setTimeout(() => {
              setIsDeleting(true);
            }, 1200);
          }
        } else {
          const updatedText = currentWord.substring(0, text.length - 1);
          setText(updatedText);

          if (updatedText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 80 : 150
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-20 xl:px-32 py-12 md:py-20 max-w-7xl mx-auto w-full">
    
        <div className="flex flex-col flex-1 items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-row items-center gap-3 bg-blue-50 px-4 py-1.5 rounded-full mb-6 w-fit border border-blue-100">
            <div className="w-2 h-2 rounded-full bg-[#0369A8] animate-pulse"></div>
            <p className="text-xs md:text-sm text-[#0369A9] font-semibold">
              Now with AI Sprint Forecasting
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Manage <span className="text-[#0369A9]">Projects.</span>
            <br />
            Track <span className="text-slate-900">Tasks.</span>
            <br />
            Ship <span className="text-[#0369A9] min-h-[60px] inline-block md:inline">{text}<span className="animate-pulse font-light">|</span></span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 font-medium max-w-lg leading-relaxed">
            The command center for high-performance engineering teams. Orchestrate sprints, automate workflows, and hit your milestones with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[#0284C7] transition-all duration-300 transform active:scale-95 cursor-pointer text-sm"
            >
              Get started for free
            </button>

            <button className="px-8 py-3 rounded-xl font-semibold shadow-md cursor-pointer bg-blue-100 text-[#0369A9] hover:bg-[#0284C7] hover:text-white transition-all duration-300 transform active:scale-95 text-sm">
              View Demo
            </button>
          </div>

          <div className="flex mt-8 items-center gap-3">
            <div className="flex -space-x-3">
              <img
                src="/man1.jpg"
                alt="man1"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 3 }}
              />

              <img
                src="/man2.jpg"
                alt="man2"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 2 }}
              />

              <img
                src="/man3.jpg"
                alt="man3"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 1 }}
              />
            </div>

            <p className="text-sm text-slate-600">
              Joined by{" "}
              <span className="text-[#0369A9] font-bold">
                12,000+
              </span>{" "}
              teams worldwide
            </p>
          </div>
        </div>

        {/* Right Column: Hero Showcase Image */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-[#0369A9] rounded-2xl blur-xl opacity-15"></div>
            <img
              src="/hero.png"
              alt="FlowTrack Dashboard Showcase"
              className="relative rounded-2xl shadow-2xl border border-slate-100 w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="h-fit py-12 bg-slate-50 border-y border-slate-100 flex flex-col gap-8">
        <p className="text-center text-xs font-bold tracking-wider text-slate-400">
          TRUSTED BY MODERN INFRASTRUCTURE LEADERS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 px-6 font-semibold text-slate-400 text-lg">
          <h1 className="hover:text-[#0369A9] transition-all duration-300 cursor-pointer text-sm md:text-base tracking-widest">
            VERCEL
          </h1>

          <h1 className="hover:text-[#0369A9] transition-all duration-300 cursor-pointer text-sm md:text-base tracking-widest">
            NOTION
          </h1>

          <h1 className="hover:text-[#0369A9] transition-all duration-300 cursor-pointer text-sm md:text-base tracking-widest">
            LINUX
          </h1>

          <h1 className="hover:text-[#0369A9] transition-all duration-300 cursor-pointer text-sm md:text-base tracking-widest">
            STRIPE
          </h1>

          <h1 className="hover:text-[#0369A9] transition-all duration-300 cursor-pointer text-sm md:text-base tracking-widest">
            AIRBNB
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;