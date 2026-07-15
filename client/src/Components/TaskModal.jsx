import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask, getTaskByProject } from "@/Redux/thunk/taskManage";
import { FiX, FiAlignLeft } from "react-icons/fi";
import { toast } from "sonner";

const TaskModal = ({ task, projectId, onClose }) => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState(task?.taskTitle || "");
  const [description, setDescription] = useState(task?.taskDescription || "");
  const [status, setStatus] = useState(task?.taskStatus || "Pending");
  const [priority, setPriority] = useState(task?.taskPriority || "Medium");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.taskTitle);
      setDescription(task.taskDescription);
      setStatus(task.taskStatus);
      setPriority(task.taskPriority);
    }
  }, [task]);

  const handleUpdate = async (field, value) => {
    try {
      const result = await dispatch(updateTask({ id: task._id, [field]: value }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`Task ${field} updated`);
        dispatch(getTaskByProject(projectId));
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("An error occurred" , error.message);
    }
  };

  const saveTitle = () => {
    setIsEditingTitle(false);
    if (title !== task.taskTitle) handleUpdate("taskTitle", title);
  };

  const saveDescription = () => {
    setIsEditingDesc(false);
    if (description !== task.taskDescription) handleUpdate("taskDescription", description);
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              FLOW-{task._id.substring(0, 4)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
          
          {/* Main Column */}
          <div className="flex-1 space-y-8">
            {/* Title */}
            <div>
              {isEditingTitle ? (
                <div className="flex flex-col gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={saveTitle}
                    onKeyDown={(e) => e.key === "Enter" && saveTitle()}
                    className="text-2xl font-bold text-slate-900 w-full border-2 border-blue-500 rounded-lg p-2 outline-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveTitle} className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">Save</button>
                    <button onClick={() => { setIsEditingTitle(false); setTitle(task.taskTitle); }} className="text-slate-600 px-3 py-1 rounded hover:bg-slate-100 text-sm font-medium">Cancel</button>
                  </div>
                </div>
              ) : (
                <h1 
                  onClick={() => setIsEditingTitle(true)}
                  className="text-2xl font-bold text-slate-900 cursor-text hover:bg-slate-50 p-2 -ml-2 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                >
                  {title}
                </h1>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiAlignLeft className="w-5 h-5 text-slate-500" />
                <h3 className="text-base font-semibold text-slate-800">Description</h3>
              </div>
              
              {isEditingDesc ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[150px] border-2 border-blue-500 rounded-lg p-3 outline-none resize-y text-slate-700"
                    placeholder="Add a more detailed description..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={saveDescription} className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">Save</button>
                    <button onClick={() => { setIsEditingDesc(false); setDescription(task.taskDescription); }} className="text-slate-600 px-4 py-1.5 rounded-md hover:bg-slate-100 text-sm font-medium">Cancel</button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingDesc(true)}
                  className={`cursor-text p-3 -ml-3 rounded-lg border transition-colors min-h-[100px] ${description ? 'border-transparent hover:bg-slate-50 hover:border-slate-200' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                >
                  {description || "Add a description..."}
                </div>
              )}
            </div>
            
            {/* Comments */}
            <div className="pt-6 border-t border-slate-100">
               <h3 className="text-base font-semibold text-slate-800 mb-4">Activity</h3>
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">U</div>
                  <div className="flex-1">
                    <input type="text" placeholder="Add a comment..." className="w-full border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full md:w-64 space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-5">
              
              {/* Status */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    handleUpdate("taskStatus", e.target.value);
                  }}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    handleUpdate("taskPriority", e.target.value);
                  }}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium"
                >
                  <option value="High">High 🔴</option>
                  <option value="Medium">Medium 🟡</option>
                  <option value="Low">Low 🟢</option>
                </select>
              </div>

              {/* Assignee */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Assignee</label>
                <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer transition-colors">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    U
                  </div>
                  <span className="text-sm font-medium text-slate-700">Unassigned</span>
                </div>
              </div>

            </div>
            
            <div className="text-xs text-slate-400 px-2 space-y-1">
              <div className="flex items-center justify-between">
                <span>Created</span>
                <span>Just now</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span>Just now</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
