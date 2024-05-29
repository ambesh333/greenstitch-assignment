import mongoose, { Schema, Document } from "mongoose";
//Defining Types

interface ITask extends Document {
  title: string;
  description: string;
  status: "Pending" | "InProgress" | "Completed";
}
//Definning Schema
const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enmun: ["Pending", "InProgress", "Completed"] },
});
//Defining model for task
const Task = mongoose.model<ITask>("Task", TaskSchema);

export { Task, ITask };
