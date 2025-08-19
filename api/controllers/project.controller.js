import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// Create new research project (professors only)
export const createProject = async (req, res, next) => {
  try {
    // Fetch user from DB
    
    const user = await User.findById(req.userId);
    if (!user) return next(createError(404, "User not found"));
    
    // Only professors can create projects
    if (user.role !== "professor") {
      return next(createError(403, "Only professors can create projects"));
    }
    
    // Create new project with professorId = current user
    const newProject = new Project({
      professorId: req.userId,
      ...req.body,
    });            
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {    
    next(err);
  }
};

// Delete project (only owner professor)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found"));

    // Fetch user to check role
    const user = await User.findById(req.userId);
    if (!user || user.role !== "professor") {
      return next(createError(403, "Only professors can delete projects"));
    }

    if (project.professorId !== req.userId) {
      return next(createError(403, "You can delete only your own projects!"));
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send("Project has been deleted!");
  } catch (err) {
    next(err);
  }
};


export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate({
        path: "professorId",
        select: "username", // select only useful fields
      })
      .populate({
        path: "requirements", // if requirements is a sub-document reference
        select: "title description", // pick required fields
      });

    if (!project) return next(createError(404, "Project not found!"));

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

export const getMyProjects = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.professorId && { professorId: q.professorId }),
    ...(q.userId && { userId: q.userId }), // <-- fetch my projects
    ...(q.domain && { domain: q.domain }),
    ...((q.min || q.max) && {
      stipend: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const projects = await Project.find(filters).sort({
      [q.sort || "createdAt"]: -1,
    });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};


// Get all projects with pagination + filters
export const getProjects = async (req, res, next) => {
  const q = req.query;

  // Filters
  const filters = {
    ...(q.professorId && { professorId: q.professorId }),
    ...(q.userId && { userId: q.userId }), // For "myProjects"
    ...(q.domain && { domain: q.domain }),
    ...((q.min || q.max) && {
      stipend: {
        ...(q.min && { $gte: Number(q.min) }),
        ...(q.max && { $lte: Number(q.max) }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    // Pagination setup
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 6;
    const skip = (page - 1) * limit;

    // Fetch projects with filters + pagination
    const projects = await Project.find(filters)
      .sort({ [q.sort || "createdAt"]: -1 })
      .skip(skip)
      .limit(limit)
      .populate("professorId", "name email department"); // include professor details

    // Total count for hasMore
    const total = await Project.countDocuments(filters);
    const hasMore = page * limit < total;

    res.status(200).json({ projects, hasMore });
  } catch (err) {
    next(err);
  }
};
