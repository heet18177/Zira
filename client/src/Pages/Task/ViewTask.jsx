
import { deleteTask, getTaskByProject, updateTask } from "@/Redux/thunk/taskManage";
import { useEffect, useState } from "react";
import {  FiFolder, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoSearchOutline } from "react-icons/io5";
import TaskModal from "@/Components/TaskModal";
import { FiCheckCircle } from "react-icons/fi";

const COLUMN_STATUS_MAP = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

const ViewTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const tasks = useSelector((state) => state.task.task);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const [search , setSerch] = useState("")
  const filterTask = Array.isArray(tasks)
    ? tasks.filter((task) => task.taskTitle.toLowerCase().includes(search.toLowerCase()))
    : [];

  const filterPending = Array.isArray(filterTask)
    ? filterTask.filter((task) => task.taskStatus === "Pending")
    : [];
  const filterProgress = Array.isArray(filterTask)
    ? filterTask.filter((task) => task.taskStatus === "In Progress")
    : [];
  const filterCompleted = Array.isArray(filterTask)
    ? filterTask.filter((task) => task.taskStatus === "Completed")
    : [];

  useEffect(() => {
    if (projectId) {
      dispatch(getTaskByProject(projectId));
    }
  }, [dispatch, projectId]);

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteTask(taskIdToDelete));
      setShowDeleteConfirmModal(false);
      setTaskIdToDelete(null);
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getTaskByProject(projectId));
        toast.success(result.payload.message || "Task deleted successfully!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const newStatus = COLUMN_STATUS_MAP[destination.droppableId];
    if (!newStatus) return;

    const draggedTask = Array.isArray(tasks)
      ? tasks.find((t) => t._id === draggableId)
      : null;
    if (!draggedTask) return;

    try {
      const result2 = await dispatch(
        updateTask({ id: draggableId, taskStatus: newStatus })
      );
      if (result2.meta.requestStatus === "fulfilled") {
        toast.success(`Task moved to "${newStatus}"`);
      } else {
        toast.error("Failed to update task status");
        dispatch(getTaskByProject(projectId));
      }
    } catch {
      toast.error("Failed to update task status");
      dispatch(getTaskByProject(projectId));
    }
  };

  return (
    <>
      <main className="flex-grow py-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full">
        <div className="mb-8 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <FiFolder className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Manage Tasks
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <div className="relative flex-1 sm:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IoSearchOutline className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSerch(e.target.value)}
                  className="border border-slate-200 rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm"
                />
              </div>

              <button
                onClick={() => navigate(`/add-task/${projectId}`)}
                className="flex items-center justify-center gap-1 text-sm font-semibold text-white bg-[#0369A9] px-4 py-2.5 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <FiPlus className="w-4 h-4" />
                New Task
              </button>
          </div>
          <p className="mt-2 text-base text-slate-500 sm:ml-[52px]">
            View and manage all your team's ongoing and completed Tasks.
          </p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/*Pending Column */}
            <Droppable droppableId="pending">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl transition-all duration-300 flex flex-col overflow-hidden min-h-[200px] p-2 ${
                    snapshot.isDraggingOver
                      ? "bg-slate-200"
                      : "bg-slate-100"
                  }`}
                >
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-3 px-2 pt-2">
                      <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        Pending <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{filterPending.length}</span>
                      </h2>
                    </div>

                    <div className="space-y-2">
                      {filterPending.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setActiveTask(task)}
                              className={`bg-white rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                                snapshot.isDragging
                                  ? "shadow-lg rotate-2 scale-105"
                                  : "shadow-sm border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                              }`}
                            >
                              <p className="text-sm text-slate-800 mb-3 line-clamp-2">
                                {task.taskTitle}
                              </p>
                              
                              <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                                    <FiCheckCircle className="w-3.5 h-3.5 text-blue-600" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-500">
                                    FLOW-{task._id.substring(0, 4)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs" title={task.taskPriority}>
                                    {task.taskPriority === "High" ? "🔴" : task.taskPriority === "Medium" ? "🟡" : "🟢"}
                                  </span>
                                  {task.assignTo?.length > 0 && (
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-white">
                                      U
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>

            {/* In Progress*/}
            <Droppable droppableId="in-progress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl transition-all duration-300 flex flex-col overflow-hidden min-h-[200px] p-2 ${
                    snapshot.isDraggingOver
                      ? "bg-slate-200"
                      : "bg-slate-100"
                  }`}
                >
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-3 px-2 pt-2">
                      <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        In Progress <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{filterProgress.length}</span>
                      </h2>
                    </div>

                    <div className="space-y-2">
                      {filterProgress.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setActiveTask(task)}
                              className={`bg-white rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                                snapshot.isDragging
                                  ? "shadow-lg rotate-2 scale-105"
                                  : "shadow-sm border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                              }`}
                            >
                              <p className="text-sm text-slate-800 mb-3 line-clamp-2">
                                {task.taskTitle}
                              </p>
                              
                              <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                                    <FiCheckCircle className="w-3.5 h-3.5 text-blue-600" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-500">
                                    FLOW-{task._id.substring(0, 4)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs" title={task.taskPriority}>
                                    {task.taskPriority === "High" ? "🔴" : task.taskPriority === "Medium" ? "🟡" : "🟢"}
                                  </span>
                                  {task.assignTo?.length > 0 && (
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-white">
                                      U
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>

            {/*Completed Column*/}
            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl transition-all duration-300 flex flex-col overflow-hidden min-h-[200px] p-2 ${
                    snapshot.isDraggingOver
                      ? "bg-slate-200"
                      : "bg-slate-100"
                  }`}
                >
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-3 px-2 pt-2">
                      <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        Completed <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{filterCompleted.length}</span>
                      </h2>
                    </div>

                    <div className="space-y-2">
                      {filterCompleted.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setActiveTask(task)}
                              className={`bg-white rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                                snapshot.isDragging
                                  ? "shadow-lg rotate-2 scale-105"
                                  : "shadow-sm border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                              }`}
                            >
                              <p className="text-sm text-slate-800 mb-3 line-clamp-2">
                                {task.taskTitle}
                              </p>
                              
                              <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                                    <FiCheckCircle className="w-3.5 h-3.5 text-blue-600" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-500">
                                    FLOW-{task._id.substring(0, 4)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs" title={task.taskPriority}>
                                    {task.taskPriority === "High" ? "🔴" : task.taskPriority === "Medium" ? "🟡" : "🟢"}
                                  </span>
                                  {task.assignTo?.length > 0 && (
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-white">
                                      U
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>

          </div>
        </DragDropContext>
      </main>

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => {
                setShowDeleteConfirmModal(false);
                setTaskIdToDelete(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <div className="text-center">
              <div className="w-14 h-14 p-3.5 mb-4 mx-auto rounded-full bg-[#f0f9ff] flex items-center justify-center">
                <FiTrash2 className="w-7 h-7 text-[#0369A9]" />
              </div>

              <h3 className="text-slate-900 text-lg font-semibold">
                Are you sure you want to delete this project?
              </h3>

              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                This action is permanent and cannot be undone. Once deleted, the
                project will be removed permanently.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteConfirmModal(false);
                  setTaskIdToDelete(null);
                }}
                className="w-full px-4 py-2 text-slate-900 text-sm font-semibold rounded-md border border-slate-300 hover:bg-slate-50"
              >
                No, Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-white text-sm font-semibold rounded-md bg-red-600 hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTask && (
        <TaskModal 
          task={activeTask} 
          projectId={projectId}
          onClose={() => setActiveTask(null)} 
        />
      )}
    </>
  );
};

export default ViewTask;
