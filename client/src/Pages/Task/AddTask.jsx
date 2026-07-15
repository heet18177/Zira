
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  FiArrowLeft,
  FiPlus,
  FiUsers,
  FiX,
  FiLayers,
  FiCheck,
} from "react-icons/fi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projects } from "@/Redux/thunk/projectManage";
import {addTask} from "@/Redux/thunk/taskManage";

const statusOptions = [
  {
    value: "Pending",
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
 
];

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // const tasks = useSelector((state)=>state.task)
  const projectUser = useSelector((state) => state.project.pro);

  const filterAssign = [];
  if (Array.isArray(projectUser)) {
    const project = projectUser.find(p => p._id === projectId);
    if (project && Array.isArray(project.projectMember)) {
      project.projectMember.forEach(member => {
        if (member && member._id && member.name) {
          filterAssign.push({ id: member._id, name: member.name });
        }
      });
    }
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    startDate: "",
    deadline: "",
    assignTo: [],
  });

  const [assigneeInput, setAssigneeInput] = useState("");
  const [loading , setLoading] = useState(false)

  const handleAddAssignee = () => {
    if (!assigneeInput) return;

    if (form.assignTo.includes(assigneeInput)) {
      toast.error("Assignee already added");
      return;
    }

    setForm({
      ...form,
      assignTo: [...form.assignTo, assigneeInput],
    });

    setAssigneeInput("");
  };

  useEffect(() => {
    dispatch(projects());
  }, [dispatch]);

  const addTaskHandler = async (e) =>{
    e.preventDefault();

    if (form.assignTo.length === 0) {
      toast.error("Please assign at least one member");
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        taskTitle: form.title,
        taskDescription: form.description,
        assignTo: form.assignTo,
        projectId: projectId,
        startDateT: form.startDate,
        dueDateT: form.deadline,
        taskStatus: form.status,
        taskPriority: form.priority
      };

      const result = await dispatch(addTask(payload))

      if(result.meta.requestStatus === "fulfilled"){
        toast.success(result.payload.message || "Task added successfully!");
        navigate(`/view-tasks/${projectId}`);
      }
      
    } 
    catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add task");
    }
    finally{
      setLoading(false);
    }
    
  }

  return (
    <>
      <main className="flex-grow py-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full">
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
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Create New Task
            </h1>
            <button
                onClick={() => navigate(`/view-tasks/${projectId}`)}
                className="text-sm font-semibold text-white bg-[#0369A9] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                View Tasks
              </button>
            </div>
           
          </div>
          <p className="mt-2 text-base text-slate-500 sm:ml-[52px]">
            Fill in the details below to set up your new task.
          </p>
        </div>

        <form onSubmit={addTaskHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Task Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                    placeholder="e.g., Complete project proposal"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                    placeholder="Provide a detailed description of the task..."
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Priority
                    </label>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ top: "-4px" }}
                      >
                        Select Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Priority"
                        value={form.priority}
                        onChange={(e) =>
                          setForm({ ...form, priority: e.target.value })
                        }
                        sx={{ height: "46px", borderRadius: "0.75rem" }}
                        className="bg-slate-50/50"
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  
                  <div>
                     <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Task Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="deadline"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      value={form.deadline}
                      onChange={(e) =>
                        setForm({ ...form, deadline: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                      required
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Team Members Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50 mt-6">
              <div className="flex items-center gap-2 mb-6">
                <FiUsers className="w-5 h-5 text-[#0369A9]" />
                <h2 className="text-lg font-bold text-slate-800">Assign To</h2>
              </div>

              <div>
                <label
                  htmlFor="assigneeInput"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Add Assignee
                </label>
                <div className="flex gap-3">
                  <select
                    id="assigneeInput"
                    value={assigneeInput}
                    onChange={(e) => setAssigneeInput(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0369A9]/20 focus:border-[#0369A9] transition-colors bg-slate-50/50 text-sm"
                  >
                    <option value="">Select Assignee</option>
                    {filterAssign.map((assignee, index) => (
                      <option key={index} value={assignee.id}>
                        {assignee.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAssignee}
                    className="px-5 py-3 rounded-xl bg-[#0369A9] text-white font-semibold text-sm hover:bg-[#0284C7] active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Member Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {form.assignTo.map((assigneeId) => {
                    const assignee = filterAssign.find((a) => a.id === assigneeId);
                    return (
                    <span
                      key={assigneeId}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-sm font-medium text-[#0369A9]"
                    >
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center text-white text-xs font-bold uppercase">
                        {assignee?.name?.charAt(0) || "?"}
                      </span>
                      {assignee?.name}
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            assignTo: form.assignTo.filter(
                              (id) => id !== assigneeId,
                            ),
                          })
                        }
                        className="ml-1 w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )})}
                </div>

                {form.assignTo.length === 0 && (
                  <div className="mt-4 p-6 rounded-xl border-2 border-dashed border-slate-200 text-center">
                    <FiUsers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-400 font-medium">
                      No assignees added yet
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Add assignees by selecting them above
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

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
                      form.status === option.value
                        ? `${option.color} border-current shadow-sm`
                        : "border-slate-100 hover:border-slate-200 bg-slate-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={form.status === option.value}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-3 h-3 rounded-full ${
                        form.status === option.value
                          ? option.dot
                          : "bg-slate-300"
                      } transition-colors`}
                    />
                    <span className="text-sm font-semibold">
                      {option.value}
                    </span>
                    {form.status === option.value && (
                      <FiCheck className="w-4 h-4 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0369A9] to-[#0284C7] p-8 rounded-3xl shadow-xl text-white">
              <h2 className="text-lg font-bold mb-4">Task Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-100">Title</span>
                  <span className="font-semibold truncate ml-4 max-w-[60%] text-right">
                    {form.taskTitle || "—"}
                  </span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between text-sm">
                  <span className="text-blue-100">Status</span>
                  <span className="font-semibold">{form.status}</span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between text-sm">
                  <span className="text-blue-100">Priority</span>
                  <span className="font-semibold">
                    {/* {
                        prio.find(
                          (p) => p.value === form.priority,
                        )?.icon
                      }{" "} */}
                    {form.priority}
                  </span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between text-sm">
                  <span className="text-blue-100">Members</span>
                  <span className="font-semibold">{form.assignTo.length}</span>
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
                    Create Task
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
        </form>
      </main>
    </>
  );
};

export default AddTask;
