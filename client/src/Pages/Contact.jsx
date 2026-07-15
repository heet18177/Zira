import { useState } from "react";
import Navabar from "../Components/Navabar";
import API from "@/api/axios";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";

const Contact = () => {


  const [form , setForm] = useState({
    fullName:"",
    email:"",
    subject:"",
    message:""
  })

  const [loading , setLoading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const result = await API.post('/contact/create',form);
      console.log(result.data)
      toast.success(result.data.message || "Message sent successfully");
    }
    catch(error){
      toast.error(error.response.data.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
      <main className="flex-grow py-16 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold tracking-wider text-[#0369A9] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mt-6 leading-tight">
            We'd love to hear from <span className="text-[#0369A9]">you</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Have questions about FlowTrack? Get in touch with our team. We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mt-8">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100/50">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Email Us</h3>
              <p className="text-sm text-slate-600 mb-2">For general inquiries and support.</p>
              <a href="mailto:support@flowtrack.io" className="text-[#0369A9] font-semibold hover:underline text-sm md:text-base">
                support@flowtrack.io
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100/50">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Office Location</h3>
              <p className="text-sm text-slate-600">
                4061 , Silver Business Point , <br />
                Vip Circle, Surat , Gujarat 395005
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100/50">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Follow Us</h3>
              <div className="flex gap-4 mt-2">
                <span className="text-slate-600 hover:text-[#0369A9] cursor-pointer text-sm font-semibold">Twitter</span>
                <span className="text-slate-600 hover:text-[#0369A9] cursor-pointer text-sm font-semibold">GitHub</span>
                <span className="text-slate-600 hover:text-[#0369A9] cursor-pointer text-sm font-semibold">LinkedIn</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50"
                    placeholder="Enter Your Fullname"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50"
                    placeholder="Enter Your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer text-center text-sm"
              >
                {loading ? <CircularProgress size={24} color="inherit"/> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;