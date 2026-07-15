
const About = () => {
  const values = [
    {
      title: "Our Mission",
      description: "To build the world's most intuitive, high-performance command center for engineering and product development teams.",
      icon: "🚀"
    },
    {
      title: "Our Vision",
      description: "A future where developers and teams can turn raw ideas into production-ready software without administrative friction.",
      icon: "👁️"
    },
    {
      title: "Our Culture",
      description: "We believe in high autonomy, radical transparency, deep focus, and continuous learning from customer feedback.",
      icon: "🤝"
    }
  ];

  return (
    <>
      <main className="flex-grow py-16 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-wider text-[#0369A9] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            About FlowTrack
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mt-6 leading-tight">
            We're building the future of <span className="text-[#0369A9]">Project Management</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
            FlowTrack was founded to eliminate the friction in traditional project management tools. We build beautiful, fast, and feature-rich software designed specifically for modern engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <span className="text-4xl mb-4 block">{val.icon}</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{val.title}</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default About;