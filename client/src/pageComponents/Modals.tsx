/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
}

const AddModal = ({
  isOpen,
  onClose,
  setOpen,

  socket,
}: AddModalProps) => {
  const initialTaskData = {
    title: "",
    description: "",
  };

  const [taskData, setTaskData] = useState(initialTaskData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = async () => {
    await socket.emit("createTask", taskData);

    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded bg-[#f1f5f9] border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded bg-[#f1f5f9] border border-slate-300 text-sm font-medium"
        />

        <button
          className="w-full mt-3 rounded-md h-9 bg-[#475569] text-blue-50 font-medium"
          onClick={handleSubmit}
        >
          ADD Task
        </button>
      </div>
    </div>
  );
};

export default AddModal;
