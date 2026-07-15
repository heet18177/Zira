import Navabar from "./Navabar";
import Tools from "./Tools";

const Features = () => {
  return (
    <>
      <main className="flex-grow">
        <div className="py-16 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full text-center">
          <span className="text-sm font-bold tracking-wider text-[#0369A9] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            Features Overview
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mt-6 leading-tight">
            Designed for the way <span className="text-[#0369A9]">modern teams</span> build
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how FlowTrack helps you plan sprints, track tasks, automate dev workflows, and forecast delivery dates with precision.
          </p>
        </div>
        <Tools />
      </main>
    </>
  );
};

export default Features;