import { FiCheck } from "react-icons/fi"

const Pricing = () => {
  return (
    <>
      <main className="flex-grow py-20 px-6 sm:px-10 lg:px-16 xl:px-32 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-700">
          <span className="text-[#0369A9] font-bold tracking-wide uppercase text-sm">PRICING PLANS</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
            Simple, Transparent <br />
            <span className="text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-[#0369A9] to-pink-500">Pricing For Everyone</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. All plans include a 14-day free trial and can be canceled anytime.
          </p>
        </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group animate-in fade-in slide-in-from-bottom-8 delay-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Starter</h3>
                <span className="text-sm font-bold bg-gradient-to-r from-slate-500 to-slate-700 text-white px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-extrabold text-slate-900">$29</span>
                <span className="text-slate-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-slate-500 mb-8">Everything you need to get started with team collaboration.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Up to 5 Projects</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>500MB Storage</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <FiCheck className="w-5 h-5" />
                  <span>Email Support</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <FiCheck className="w-5 h-5" />
                  <span>Basic Analytics</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#0369A9] to-[#0369A9] text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[#0369A9] transition-all duration-300 transform hover:scale-105">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#0369A9] md:scale-[1.04] z-10 md:-translate-y-4 animate-in fade-in slide-in-from-bottom-10 delay-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Pro</h3>
                <span className="text-xs font-bold bg-gradient-to-r from-[#0369A9] to-[#0369A9] text-white px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-extrabold text-slate-900">$49</span>
                <span className="text-slate-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-slate-500 mb-8">Everything you need for professional project management.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Unlimited Projects</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>10GB Storage</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>24/7 Email Support</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#0369A9] to-[#0369A9] text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[#0369A9] transition-all duration-300 transform hover:scale-105">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group animate-in fade-in slide-in-from-bottom-8 delay-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Enterprise</h3>
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-extrabold text-slate-900">$99</span>
                <span className="text-slate-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-slate-500 mb-8">Custom solutions for large teams and organizations.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Unlimited Projects</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Unlimited Storage</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>24/7 Support</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <FiCheck className="w-5 h-5 text-[#0369A9]" />
                  <span>Custom Integrations</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#0369A9] to-[#0369A9] text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[#0369A9] transition-all duration-300 transform hover:scale-105">
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
      </main>
    </>
  )
}

export default Pricing