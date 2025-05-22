import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createTask } from '../features/tasks/taskThunk';

const TaskForm = () => {
    const [description, setDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [reward, setReward] = useState("")
    const dispatch = useAppDispatch();
    const { address } = useAppSelector((state) => state.wallet)
    const DAO_OWNER = import.meta.env.VITE_DAO_OWNER;


  const handleSubmit = (e) => {
      e.preventDefault()
        if (!description || !assignedTo || !reward) return;
        dispatch(createTask({ description, assignedTo, reward }))
        setDescription("")
        setAssignedTo("")
    setReward("")
  }
  // if(!address || !DAO_OWNER) alert("An error ocurred")
    // if (address.toLowerCase() !== DAO_OWNER.toLowerCase()) alert("You're not the owner!");

    return (
      <form onSubmit={handleSubmit} className="bg-gray-400 p-6 rounded shadow mb-6 space-y-4 flex items-center justify-center">
        <div className="w-lg">
     <h2 className="text-xl font-bold my-2">Create New Task</h2>
    <input type="text" placeholder="Task description" className="w-full p-2 my-2 border rounded outline-none" value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <input type="text" placeholder="Assign to address" className="w-full p-2 my-2 border rounded outline-none" value={assignedTo}
      onChange={(e) => setAssignedTo(e.target.value)}
    />

    <input type="number" placeholder="Reward (in tokens)" className="w-full p-2 my-2 border rounded outline-none" value={reward}
      onChange={(e) => setReward(e.target.value)}
    />

    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
      Create Task
          </button>
          </div>
  </form>
);
}

export default TaskForm;
