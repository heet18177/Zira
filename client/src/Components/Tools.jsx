import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Tools = () => {
  const cards = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`,
      title: "Sprint Planning",
      d1: "Automated point estimation",
      d2: "Backlog health indicators",
      d3: "Capacity planning tools",
    },

    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M18 10H6M21 6H3M21 14H3M18 18H6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`,
      title: "Smart Kanban",
      d1: "Drag-and-drop workflow",
      d2: "Custom status transitions",
      d3: "WIP limits & bottlenecks",
    },

    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`,
      title: "Collaboration",
      d1: "Real-time cursors & editing",
      d2: "Threaded task discussions",
      d3: "Slack & Teams sync",
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 10.5V17.5M11.5 5.5V17.5M16 10.5V17.5M20.5 5.5V17.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>`,
      title: "SInsightful Reporting",
      d1: "Burndown/Burnup charts",
      d2: "Lead & Cycle time analytics",
      d3: "Individual performance metrics",
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6 6L8 4M8 4L6 2M8 4H6C3.79086 4 2 5.79086 2 8M18 18L16 20M16 20L18 22M16 20H18C20.2091 20 22 18.2091 22 16M13.4172 13.4172C14.1994 13.7908 15.0753 14 16 14C19.3137 14 22 11.3137 22 8C22 4.68629 19.3137 2 16 2C12.6863 2 10 4.68629 10 8C10 8.92472 10.2092 9.80057 10.5828 10.5828M14 16C14 19.3137 11.3137 22 8 22C4.68629 22 2 19.3137 2 16C2 12.6863 4.68629 10 8 10C11.3137 10 14 12.6863 14 16Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>

`,
      title: "DevOps Sync",
      d1: "GitHub/GitLab integration",
      d2: "Auto-close on PR merge",
      d3: "CI/CD status in cards",
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M2 5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12.8C13.9201 2 14.4802 2 14.908 2.21799C15.2843 2.40973 15.5903 2.71569 15.782 3.09202C16 3.51984 16 4.0799 16 5.2V12.8C16 13.9201 16 14.4802 15.782 14.908C15.5903 15.2843 15.2843 15.5903 14.908 15.782C14.4802 16 13.9201 16 12.8 16H5.2C4.07989 16 3.51984 16 3.09202 15.782C2.71569 15.5903 2.40973 15.2843 2.21799 14.908C2 14.4802 2 13.9201 2 12.8V5.2Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M8 11.2C8 10.0799 8 9.51984 8.21799 9.09202C8.40973 8.71569 8.71569 8.40973 9.09202 8.21799C9.51984 8 10.0799 8 11.2 8H18.8C19.9201 8 20.4802 8 20.908 8.21799C21.2843 8.40973 21.5903 8.71569 21.782 9.09202C22 9.51984 22 10.0799 22 11.2V18.8C22 19.9201 22 20.4802 21.782 20.908C21.5903 21.2843 21.2843 21.5903 20.908 21.782C20.4802 22 19.9201 22 18.8 22H11.2C10.0799 22 9.51984 22 9.09202 21.782C8.71569 21.5903 8.40973 21.2843 8.21799 20.908C8 20.4802 8 19.9201 8 18.8V11.2Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
`,
      title: "AI Forecasting ",
      d1: "Predictive sprint success",
      d2: "Smart resource allocation",
      d3: "Automated task tagging",
    },
  ];

  const t = `
<svg width="15" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572M22 4L12 14.01L9 11.01"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>`;

  return (
    <div className="w-full py-5 bg-[#f0f9ff]">
      <div className="w-full h-fit mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center px-4">
          Built for Engineering Excellence
        </h1>
        <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto text-base md:text-lg px-6 leading-relaxed">
          Everything you need to move from backlog to production without the
          friction of traditional tools.
        </p>
      </div>
      <div>
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-center">
          {cards.map((card, idx) => (
            <div
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              key={idx}
            >
              <div
                dangerouslySetInnerHTML={{ __html: card.icon }}
                className="w-10 h-10 bg-[#b3d9ff]/30 text-[#0369A9] rounded-xl p-2.5 mb-5 flex items-center justify-center"
              />
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {card.title}
              </h3>
              <div className="mt-auto space-y-2.5">
                <p className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <span
                    className="text-[#0369A9] shrink-0"
                    dangerouslySetInnerHTML={{ __html: t }}
                  ></span>
                  {card.d1}
                </p>
                <p className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <span
                    className="text-[#0369A9] shrink-0"
                    dangerouslySetInnerHTML={{ __html: t }}
                  ></span>
                  {card.d2}
                </p>
                <p className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <span
                    className="text-[#0369A9] shrink-0"
                    dangerouslySetInnerHTML={{ __html: t }}
                  ></span>
                  {card.d3}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Feature Showcase */}
      <div className="w-full py-16 md:py-30 bg-[#f0f9ff] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-xs font-bold tracking-widest text-[#0369A9] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6">
              VISUAL WORKFLOW
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-md lg:max-w-none">
              The Kanban Board,{" "}
              <span className="text-[#0369A9]">Reimagined</span>
            </h2>

            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-lg">
              Stop fighting your tools. Our boards are designed for speed with instant updates, sub-task management, and filtered views that stay out of your way.
            </p>

            <a
              href="/add-project"
              className="mt-8 inline-flex items-center gap-2 text-[#0369A9] font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300 group"
            >
              Explore Boards
              <ArrowForwardIosIcon
                style={{ fontSize: "14px" }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Right: Image */}
          <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-[#0369A9] rounded-2xl blur-xl opacity-10"></div>
              <img
                src="/b1.png"
                alt="Kanban Board Preview"
                className="relative w-full rounded-2xl shadow-2xl border border-slate-100 object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </div>

          

        <div className="w-full py-16 md:py-30 bg-[#f0f9ff] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Image */}
          <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-[#0369A9] rounded-2xl blur-xl opacity-10"></div>
              <img
                src="/b2.png"
                alt="Kanban Board Preview"
                className="relative w-full rounded-2xl shadow-2xl border border-slate-100 object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-xs font-bold tracking-widest text-[#0369A9] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6">
             Deep Insights
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-md lg:max-w-none">
             Sprint Analytics
              <span className="text-[#0369A9]">That Actually Matter</span>
            </h2>

            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-lg">
              FlowTrack doesn't just show data; it provides actionable intelligence. Identify which stages of your workflow are slowing down the team and why.
            </p>

            <a
              href="/add-project"
              className="mt-8 inline-flex items-center gap-2 text-[#0369A9] font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300 group"
            >
              Analyze performance
              <ArrowForwardIosIcon
                style={{ fontSize: "14px" }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>

        </div>
      </div>

      <div className="w-full bg-[#0369A9] py-10 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="flex flex-col text-gray-300 items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">40%</h1>
          <p className="text-xs sm:text-sm mt-1">Productivity Boost</p>
          </div>

          <div className="flex flex-col text-gray-300 items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">12k+</h1>
          <p className="text-xs sm:text-sm mt-1">Teams Onboarded</p>
          </div>

          <div className="flex flex-col text-gray-300 items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">2.4x</h1>
          <p className="text-xs sm:text-sm mt-1">Faster Shipping</p>
          </div>

          <div className="flex flex-col text-gray-300 items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">99.9%</h1>
          <p className="text-xs sm:text-sm mt-1">Platform Uptime</p>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Tools;
