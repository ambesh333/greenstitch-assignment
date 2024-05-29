import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose, { ConnectOptions } from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import { Task, ITask } from "./models/task";

//creating express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
//wrapping express app in server
const httpServer = createServer(app);
//creating a socketIo server and adding cors
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
//Post and url sting
const PORT = 8080;
const MONGO_URI =
  "mongodb+srv://ambeshgaunker:1bSu8zBOja8VI4VL@cluster0.berefq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/tasks", taskRoutes);

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createTask", async (data) => {
    const { title, description } = data;
    const newTask = new Task({
      title,
      description,
      status: "Pending",
    });
    await newTask.save();
    io.sockets.emit("tasks", await Task.find());
  });

  socket.on("taskDragged", async (data) => {
    const { taskId, sourceStatus, destinationStatus } = data;
    const task = await Task.findById(taskId);
    if (task) {
      task.status = destinationStatus;
      await task.save();
      io.sockets.emit("tasks", await Task.find());
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
