import { Router, Request, Response } from "express";
import { Task } from "../models/task";

const router = Router();
//get all task
router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
});
//make a task
router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
    status: "Pending",
  });
  await newTask.save();
  res.status(201).json(newTask);
});

export default router;
