/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline } from "react-ionicons";
import { ITask } from "../types";
import { DraggableProvided } from "react-beautiful-dnd";
import moment from "moment";
import { useState } from "react";

interface TaskProps {
  task: ITask;
  provided: DraggableProvided;
  onNextStage: (taskId: string) => void;
}

const Task = ({ task, provided, onNextStage }: TaskProps) => {
  const { title, description, status, completedAt } = task;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const getNextStatus = (currentStatus: ITask["status"]): ITask["status"] => {
    switch (currentStatus) {
      case "Pending":
        return "InProgress";
      case "InProgress":
        return "Completed";
      default:
        return currentStatus;
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderDescription = () => {
    if (isDescriptionExpanded) {
      return (
        <>
          <span className="text-[13.5px] text-gray-500">{description}</span>
          <button onClick={toggleDescription} className="text-blue-500 text-sm">
            Read Less
          </button>
        </>
      );
    } else {
      const truncatedDescription =
        description.length > 20
          ? description.substring(0, 20) + "..."
          : description;
      return (
        <>
          <span className="text-[13.5px] text-gray-500">
            {truncatedDescription}
          </span>
          {description.length > 20 && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 text-sm"
            >
              Read More
            </button>
          )}
        </>
      );
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4 min-h-[100px]" // Ensure min height for uniformity
    >
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col gap-0">
          <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
          {renderDescription()}
        </div>
        {status !== "Completed" ? (
          <button
            onClick={() => onNextStage(task._id)}
            className="ml-2 px-2 py-1 bg-[#334155] text-white rounded"
          >
            {status === "Pending" ? "Start" : "Complete"}
          </button>
        ) : null}
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        {status == "Completed" ? (
          <div className="flex items-center gap-1">
            <TimeOutline color={"#666"} width="19px" height="19px" />
            <span className="text-[13px] text-gray-700">
              {completedAt
                ? moment(completedAt).format("DD/MM/YY, HH:mm")
                : "mins"}
            </span>
          </div>
        ) : (
          ""
        )}

        <div
          className={`w-[60px] rounded-full h-[5px] ${
            status === "Pending"
              ? "bg-red-500"
              : status === "InProgress"
              ? "bg-orange-500"
              : "bg-green-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Task;
