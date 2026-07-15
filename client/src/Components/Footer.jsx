
const Footer = () => {
  return (
    <div>
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-32 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="md:col-span-1 animate-in fade-in slide-in-from-bottom-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center shadow-md shadow-blue-500/20">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-xl font-bold text-slate-900">FlowTrack</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Streamline your workflow with our intuitive task management platform.
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Features</h3>
              <ul className="space-y-4">
                {["Project Management", "Team Collaboration", "Task Tracking", "Real-time Updates"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0369A9]"></div>
                    <span className="text-slate-600 text-sm hover:text-[#0369A9] transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Resources</h3>
              <ul className="space-y-4">
                {["Blog", "Help Center", "Tutorials", "API Reference"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0369A9]"></div>
                    <span className="text-slate-600 text-sm hover:text-[#0369A9] transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Company</h3>
              <ul className="space-y-4">
                {["About Us", "Careers", "Press", "Contact"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0369A9]"></div>
                    <span className="text-slate-600 text-sm hover:text-[#0369A9] transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-sm text-slate-500">© 2026 FlowTrack Inc. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {["https://facebook.com", "https://twitter.com", "https://linkedin.com", "https://instagram.com"].map((href, index) => (
                  <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0369A9] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .732.593 1.324 1.325 1.324h11.495v-9.294h-3.13v-3.504h3.13v-2.586c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.805.144v3.216h-1.914c-1.502 0-1.795.722-1.795 1.763v2.362h3.587l-.467 3.504h-3.12v9.294h6.116c.732 0 1.325-.593 1.325-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer