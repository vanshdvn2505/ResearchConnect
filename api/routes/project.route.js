// import express from "express";
// import {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.post("/", verifyToken, createGig);
// router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", getGig);
// router.get("/", getGigs);

// export default router;


import express from "express";
import {
  createProject,
  deleteProject,
  getMyProjects,
  getProject,
  getProjects,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Professors create projects
router.post("/", verifyToken, createProject);

// Professors delete their own projects
router.delete("/:id", verifyToken, deleteProject);

// Get single project details
router.get("/single/:id", getProject);

// Get all projects (with filters)
router.get("/", getProjects);

router.get("/:userId", getMyProjects);


export default router;
