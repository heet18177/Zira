import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  projects as fetchProjects,
  deleteProjects,
} from "../Redux/thunk/projectManage";
import { CircularProgress } from "@mui/material";
import {
  FiCalendar,
  FiFlag,
  // FiLayers,
  FiUsers,
  FiPlus,
  FiMoreVertical,
  FiFolder,
  FiClock,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { Pagination } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

const statusConfig = {
  Planning: {
    color: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  "In Progress": {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  Completed: {
    color: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  "On Hold": {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
};

const priorityConfig = {
  High: { color: "bg-red-100 text-red-700", icon: "🔴" },
  Medium: { color: "bg-amber-100 text-amber-700", icon: "🟡" },
  Low: { color: "bg-green-100 text-green-700", icon: "🟢" },
};

const ViewProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

 

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { pro: projects, loading } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);

   const [search, setSerch] = useState("");

  const filterProjects = projects?.filter((project) => {
    return project.projectTitle.toLowerCase().includes(search.toLowerCase());
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil((filterProjects?.length || 0) / itemsPerPage);

  const paginatedProjects = filterProjects?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDuration = (start, end) => {
    if (!start || !end) return 0;
    return Math.max(
      0,
      Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)),
    );
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProjects(selectedProjectId));
      await dispatch(fetchProjects());

      setShowDeleteModal(false);
      setSelectedProjectId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex-grow py-10 px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369A9] to-[#0284C7] flex items-center justify-center shadow-md shadow-blue-500/20">
              <FiFolder className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2 mb-2 justify-between w-full">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Manage Projects
            </h1>
               <div className="relative w-full md:w-64">
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
                onClick={() => navigate("/add-project")}
                className="flex items-center gap-2 text-sm font-semibold text-white bg-[#0369A9] px-5 py-2.5 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
              >
                <FiPlus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
          <p className="mt-2 text-base text-slate-500 ml-[52px]">
            View and manage all your team's ongoing and completed projects.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <CircularProgress style={{ color: "#0369A9" }} />
          </div>
        ) : filterProjects?.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100/50 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FiFolder className="w-10 h-10 text-[#0369A9]/50" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No projects yet
            </h2>
            <p className="text-slate-500 mb-8 max-w-md">
              Get started by creating your first project workspace. You can add
              team members, set timelines, and track progress.
            </p>
            <button
              onClick={() => navigate("/add-project")}
              className="flex items-center gap-2 text-base font-semibold text-white bg-[#0369A9] px-6 py-3 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-95"
            >
              <FiPlus className="w-5 h-5" />
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects?.map((project) => {
              const statusStyle =
                statusConfig[project.projectStatus] || statusConfig["Planning"];
              const priorityStyle =
                priorityConfig[project.projectPriority] ||
                priorityConfig["Medium"];

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl border border-slate-100/80 transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100/80">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${statusStyle.color}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        />
                        {project.projectStatus}
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#0369A9] transition-colors line-clamp-1">
                      {project.projectTitle}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 h-10">
                      {project.projectDescription || "No description provided."}
                    </p>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 bg-slate-50/30 flex-grow space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FiFlag className="w-4 h-4 text-slate-400" />
                        <span>Priority</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span>{priorityStyle.icon}</span>
                        <span className={priorityStyle.color}>
                          {project.projectPriority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FiCalendar className="w-4 h-4 text-slate-400" />
                        <span>Timeline</span>
                      </div>
                      <div className="font-medium text-slate-700">
                        {formatDate(project.startDate)} -{" "}
                        {formatDate(project.endDate)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FiClock className="w-4 h-4 text-slate-400" />
                        <span>Duration</span>
                      </div>
                      <div className="font-medium text-slate-700">
                        {getDuration(project.startDate, project.endDate)} days
                      </div>
                    </div>
                  </div>

                  {/* Card Footer - Members */}
                  <div className="p-5 border-t border-slate-100/80 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">
                        {project.projectMember?.length || 0} Members
                      </span>
                    </div>

                    {/* Member Avatars  */}
                    {project.projectMember?.length > 0 && (
                      <div className="flex -space-x-2">
                        {project.projectMember
                          .slice(0, 3)
                          .map((member, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0369A9] to-[#0284C7] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                            >
                              {project.projectMember[idx].name
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          ))}
                        {project.projectMember.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-600 text-xs font-bold shadow-sm">
                            +{project.projectMember.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    {user?.role === "admin" || user?.role === "manager" ? (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() =>
                            navigate(`/edit-project/${project._id}`)
                          }
                          className="flex items-center gap-1.5 text-sm cursor-pointer font-semibold text-white bg-[#0ea5e9] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-95"
                        >
                          <FiEdit className="w-4 h-4" />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/single-project/${project._id}`)
                          }
                          className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-white bg-[#0ea5e9] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-95"
                        >
                          <FiEye className="w-4 h-4" />
                          View
                        </button>

                        <button
                          onClick={() => {
                            setSelectedProjectId(project._id);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md active:scale-95"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/single-project/${project._id}`)
                        }
                        className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-white bg-[#0ea5e9] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-95"
                      >
                        <FiEdit className="w-4 h-4" />
                        View
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedProjectId(null);
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
                  setShowDeleteModal(false);
                  setSelectedProjectId(null);
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
       <div className="flex justify-center mt-8 pb-8">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
                shape="rounded"
                size="medium"
              />
            </div>
    </>
  );
};

export default ViewProjects;
