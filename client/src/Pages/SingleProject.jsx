import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTaskByProject } from "@/Redux/thunk/taskManage";

const SingleProject = () => {
  const project = useSelector((state) => state.project.pro);
  const { id } = useParams();
  const navigate = useNavigate()

  const singleProject = project.find((project) => project._id === id);
  console.log(singleProject);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.task);

  useEffect(() => {
    dispatch(getTaskByProject(id));
  }, [dispatch, id]);

  const priority = {
    High: "🔴",
    Medium: "🟡",
    Low: "🟢",
  };

  const status = {
    Planning: "🔵",
    "In Progress": "🟠",
    Completed: "🟢",
    "On Hold": "🔴",
  };

  return (
    <>
      <main className="flex-grow py-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {singleProject?.projectTitle || "Project Details"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 bg-slate-100 text-slate-700`}>
                {status[singleProject?.projectStatus]} {singleProject?.projectStatus}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 bg-slate-100 text-slate-700`}>
                {priority[singleProject?.projectPriority]} {singleProject?.projectPriority} Priority
              </span>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button onClick={()=> navigate(`/view-tasks/${id}`)} className="text-sm px-6 py-2.5 rounded-xl  text-[#0369A9] font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 border-2 border-[#0369A9] transition-all duration-300 transform active:scale-95 cursor-pointer">Task Board</button>
            <button onClick={()=> navigate(`/add-task/${id}`)} className="text-sm px-6 py-2.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[#0284C7] transition-all duration-300 transform active:scale-95 cursor-pointer">Add Task</button>
          </div>
        </div>
      
        {/* Project Details Grid */}  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Project Description</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-justify">{singleProject?.projectDescription || "No description provided."}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2 border-b border-slate-100 pb-2">Key Dates</h2>
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Start Date</p>
              <p className="text-slate-800 font-semibold">{singleProject?.startDate ? new Date(singleProject.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">End Date</p>
              <p className="text-slate-800 font-semibold">{singleProject?.endDate ? new Date(singleProject.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
            <h2 className="text-2xl font-bold text-slate-800">Project Tasks</h2>
            <button onClick={()=> navigate(`/view-tasks/${id}`)} className="text-[#0369A9] font-medium hover:underline hidden sm:block">View All Tasks &rarr;</button>
          </div>
          {tasks && tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div key={task._id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 truncate">{task.taskTitle}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{task.taskDescription}</p>
                  <div className="flex justify-between items-center text-xs font-semibold mt-auto pt-2 border-t border-slate-50">
                    <span className={`px-2 py-1 rounded-md ${task.taskStatus === 'Completed' ? 'bg-green-100 text-green-700' : task.taskStatus === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {task.taskStatus}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">Priority: {priority[task.taskPriority]} {task.taskPriority}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
              <p className="text-slate-500 mb-4">No tasks found for this project.</p>
              <button onClick={()=> navigate(`/add-task/${id}`)} className="text-sm px-6 py-2.5 rounded-xl bg-[#0369A9] text-white font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-[#0284C7] transition-all duration-300 transform active:scale-95 cursor-pointer" >Add the first task</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SingleProject;
