/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useState, useEffect } from "react";

import { ITask } from "../../types";
import { AddOutline } from "react-ionicons";
import Task from "@/pageComponents/Task";
import AddModal from "@/pageComponents/Modals";

const Home = ({ socket }: any) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function fetchTasks() {
      fetch("http://localhost:8080/api/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data: any) => {
      setTasks(data);
    });
  }, [socket]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as ITask["status"];
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    socket.emit("taskDragged", {
      taskId: movedTask._id,
      sourceStatus: source.droppableId,
      destinationStatus: destination.droppableId,
    });
  };

  const getTasksByStatus = (status: ITask["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleNextStage = (taskId: string) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      const currentStatus = task.status;
      let nextStatus: ITask["status"];

      if (currentStatus === "Pending") {
        nextStatus = "InProgress";
      } else if (currentStatus === "InProgress") {
        nextStatus = "Completed";
      } else {
        return;
      }

      socket.emit("taskDragged", {
        taskId: taskId,
        sourceStatus: currentStatus,
        destinationStatus: nextStatus,
      });
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full flex  items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {(["Pending", "InProgress", "Completed"] as ITask["status"][]).map(
            (status) => (
              <div key={status} className="w-full flex flex-col  gap-0 ">
                <Droppable key={status} droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-col w-full min-w-[250px] gap-3 items-center py-5 rounded "
                    >
                      <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px] ">
                        {status}
                      </div>
                      {getTasksByStatus(status).map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full pl-4 "
                            >
                              <Task
                                provided={provided}
                                task={task}
                                onNextStage={handleNextStage}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {status === "Pending" && (
                  <div
                    onClick={() => openModal()}
                    className="flex cursor-pointer items-center justify-center gap-1 ml-5 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                  >
                    <AddOutline color={"#555"} />
                    Add Task
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        socket={socket}
      />
    </>
  );
};

export default Home;
