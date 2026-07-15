import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/api/axios";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import {
  FiCalendar,
  FiFlag,
  FiLayers,
  FiUsers,
  FiFileText,
  FiArrowLeft,
  FiCheck,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { editProjects, projects as fetchProjects } from "@/Redux/thunk/projectManage";

const statusOptions = [
  {
    value: "Planning",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  {
    value: "In Progress",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    value: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  {
    value: "On Hold",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
];

const priorityOptions = [
  {
    value: "High",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: "🔴",
  },
  {
    value: "Medium",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "🟡",
  },
  {
    value: "Low",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: "🟢",
  },
];

const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { pro: projects } = useSelector((state) => state.project);
  const projectToEdit = projects?.find((p) => p._id === id);

  const [form, setForm] = useState({
    projectTitle: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    projectStatus: "Planning",
    projectPriority: "Medium",
    projectMember: [],
  });

  const [memberInput, setMemberInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setForm({
        projectTitle: projectToEdit.projectTitle || "",
        projectDescription: projectToEdit.projectDescription || "",
        startDate: projectToEdit.startDate ? new Date(projectToEdit.startDate).toISOString().split("T")[0] : "",
        endDate: projectToEdit.endDate ? new Date(projectToEdit.endDate).toISOString().split("T")[0] : "",
        projectStatus: projectToEdit.projectStatus || "Planning",
        projectPriority: projectToEdit.projectPriority || "Medium",
        projectMember: projectToEdit.projectMember?.map(m => typeof m === 'object' ? m._id : m) || [],
      });
    }
  }, [projectToEdit]);

  useEffect(() => {
    dispatch(fetchProjects());
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/all");
        console.log(res.data);
        setUsers(res.data.users || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [dispatch]);


  const handleAddMember = () => {
    if (!memberInput) return;

    if (form.projectMember.includes(memberInput)) {
      toast.error("Member already added");
      return;
    }

    setForm({
      ...form,
      projectMember: [...form.projectMember, memberInput],
    });

    setMemberInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(editProjects({ id, data: form }))
      if(result.meta.requestStatus === "fulfilled"){
        toast.success(result.payload.message || "Project edited successfully!");
        navigate("/manage-projects");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to edit project");
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <>
      <main className="flex-grow py-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0369A9] transition-colors duration-300 mb-6 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <FiPlus className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2 mb-2 justify-between w-full flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Edit Project
              </h1>
              <button
                onClick={() => navigate("/manage-projects")}
                className="text-sm font-semibold text-white bg-[#0369A9] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                View Projects
              </button>
            </div>
          </div>
          <p className="mt-2 text-base text-slate-500 sm:ml-[52px]">
            Fill in the details below to set up your new project workspace.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <FiFileText className="w-5 h-5 text-[#0369A9]" />
                  <h2 className="text-lg font-bold text-slate-800">
                    Project Details
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="projectTitle"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectTitle"
                      value={form.projectTitle}
                      onChange={(e) =>
                        setForm({ ...form, projectTitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                      placeholder="e.g. Website Redesign, Mobile App V2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="projectDescription"
                      rows="5"
                      value={form.projectDescription}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          projectDescription: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 resize-none text-sm"
                      placeholder="Describe the project goals, scope, and deliverables..."
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                      {form.projectDescription.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <FiCalendar className="w-5 h-5 text-[#0369A9]" />
                  <h2 className="text-lg font-bold text-slate-800">Timeline</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={form.startDate}
                      min={getTodayDate()}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={form.endDate}
                      min={form.startDate || getTodayDate()}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Duration Preview */}
                {form.startDate && form.endDate && (
                  <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0369A9]/10 flex items-center justify-center">
                      <FiCalendar className="w-4 h-4 text-[#0369A9]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Project Duration
                      </p>
                      <p className="text-xs text-slate-500">
                        {Math.max(
                          0,
                          Math.ceil(
                            (new Date(form.endDate) -
                              new Date(form.startDate)) /
                              (1000 * 60 * 60 * 24),
                          ),
                        )}{" "}
                        days
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Team Members Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <FiUsers className="w-5 h-5 text-[#0369A9]" />
                  <h2 className="text-lg font-bold text-slate-800">
                    Team Members
                  </h2>
                </div>

                <div>
                  <label
                    htmlFor="memberInput"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Add Members
                  </label>
                  <div className="flex gap-3">
                    <select
                      id="memberInput"
                      value={memberInput}
                      onChange={(e) => setMemberInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                    >
                      <option value="">Select Team Member</option>

                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-5 py-3 rounded-xl bg-[#0369A9] text-white font-semibold text-sm hover:bg-[#0284C7] active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {/* Member Tags */}
                  {form.projectMember.map((memberId) => {
                    const user = users.find((u) => u._id === memberId);

                    return (
                      <span
                        key={memberId}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-sm font-medium text-[#0369A9] mt-2"
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br  from-[#0369A9] to-[#0284C7] flex items-center justify-center text-white text-xs font-bold uppercase">
                          {user?.name?.charAt(0) || "?"}
                        </span>

                        {user?.name || "Unknown User"}

                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              projectMember: form.projectMember.filter(
                                (id) => id !== memberId,
                              ),
                            })
                          }
                          className="ml-1 w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}

                  {form.projectMember.length === 0 && (
                    <div className="mt-4 p-6 rounded-xl border-2 border-dashed border-slate-200 text-center">
                      <FiUsers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-400 font-medium">
                        No members added yet
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Add team members by entering their ID or email above
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column — Status, Priority & Actions */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <FiLayers className="w-5 h-5 text-[#0369A9]" />
                  <h2 className="text-lg font-bold text-slate-800">Status</h2>
                </div>

                <div className="space-y-2.5">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.projectStatus === option.value
                          ? `${option.color} border-current shadow-sm`
                          : "border-slate-100 hover:border-slate-200 bg-slate-50/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectStatus"
                        value={option.value}
                        checked={form.projectStatus === option.value}
                        onChange={(e) =>
                          setForm({ ...form, projectStatus: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span
                        className={`w-3 h-3 rounded-full ${
                          form.projectStatus === option.value
                            ? option.dot
                            : "bg-slate-300"
                        } transition-colors`}
                      />
                      <span className="text-sm font-semibold">
                        {option.value}
                      </span>
                      {form.projectStatus === option.value && (
                        <FiCheck className="w-4 h-4 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Card */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <FiFlag className="w-5 h-5 text-[#0369A9]" />
                  <h2 className="text-lg font-bold text-slate-800">Priority</h2>
                </div>

                <div className="space-y-2.5">
                  {priorityOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.projectPriority === option.value
                          ? `${option.color} border-current shadow-sm`
                          : "border-slate-100 hover:border-slate-200 bg-slate-50/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectPriority"
                        value={option.value}
                        checked={form.projectPriority === option.value}
                        onChange={(e) =>
                          setForm({ ...form, projectPriority: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span className="text-base">{option.icon}</span>
                      <span className="text-sm font-semibold">
                        {option.value}
                      </span>
                      {form.projectPriority === option.value && (
                        <FiCheck className="w-4 h-4 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary Preview Card */}
              <div className="bg-gradient-to-br from-[#0369A9] to-[#0284C7] p-8 rounded-3xl shadow-xl text-white">
                <h2 className="text-lg font-bold mb-4">Project Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Title</span>
                    <span className="font-semibold truncate ml-4 max-w-[60%] text-right">
                      {form.projectTitle || "—"}
                    </span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Status</span>
                    <span className="font-semibold">{form.projectStatus}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Priority</span>
                    <span className="font-semibold">
                      {
                        priorityOptions.find(
                          (p) => p.value === form.projectPriority,
                        )?.icon
                      }{" "}
                      {form.projectPriority}
                    </span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Members</span>
                    <span className="font-semibold">
                      {form.projectMember.length}
                    </span>
                  </div>
                  {form.startDate && form.endDate && (
                    <>
                      <div className="h-px bg-white/20" />
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Duration</span>
                        <span className="font-semibold">
                          {Math.max(
                            0,
                            Math.ceil(
                              (new Date(form.endDate) -
                                new Date(form.startDate)) /
                                (1000 * 60 * 60 * 24),
                            ),
                          )}{" "}
                          days
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-[#0284C7] active:scale-95 transition-all duration-300 cursor-pointer text-center text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4" />
                      Update Project
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full py-3.5 rounded-xl bg-white text-slate-600 font-semibold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-300 cursor-pointer text-center text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditProject;
