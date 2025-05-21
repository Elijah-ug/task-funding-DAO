import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchTasks, markTaskAsComplete, rewardTasks } from '../features/tasks/taskThunk';
import ConnectWallet from './ConnectWallet';
import WalletProvider from './WalletProvider';

const TasksList = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const { address } = useAppSelector((state) => state.wallet);
    const DAO_OWNER = import.meta.env.VITE_DAO_OWNER;
    console.log("address ", address)
    console.log("DAO_OWNER ", DAO_OWNER)

    useEffect(() => {
        if (address) {
            dispatch(fetchTasks());
        }
    }, [dispatch, address]);
    if (!address) {
        return  (<> <ConnectWallet/> <WalletProvider/> </> )
      }
    console.log("Error: ", error)
    console.log("Loading flag: ", loading)
    console.log("tasks array: ", tasks)

  if (loading) return <h3 className="text-blue-500">Loading tasks...</h3>;
  if (error) return <h3 className="text-red-500">Error: {error}</h3>;
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div>
      <p className="text-green-500 font-bold text-lg mb-4">Task List</p>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded shadow bg-white">
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Assigned to:</strong> {task.assignedTo}</p>
            <p><strong>Reward:</strong> {task.reward}</p>
            <p><strong>Completed:</strong> {task.isCompleted ? "✅" : "❌"}</p>
            <p><strong>Paid:</strong> {task.isPaid ? "✅" : "❌"}</p>
            <div className="mt-2 space-x-2">
              { address.toLowerCase() === task.assignedTo.toLowerCase() && !task.isCompleted && (
                <button
                  onClick={() => dispatch(markTaskAsComplete({ taskId: task.id }))}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Mark As Complete
                </button>
              ) }
              {address.toLowerCase() === DAO_OWNER.toLowerCase() && task.isCompleted && !task.isPaid && (
                <button
                  onClick={() => dispatch(rewardTasks({ taskId: task.id }))}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Reward Task
                </button>
                    )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
