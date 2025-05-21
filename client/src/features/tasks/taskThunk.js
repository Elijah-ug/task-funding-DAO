import { getDAOContract } from "../../utils/contracts";
import { setError, setLoading, setTasks } from "./taskSlice"
import { ethers } from "ethers";

export const fetchTasks = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading())
        const { wallet } = getState();
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const dao = await getDAOContract(signer);
        const count = await dao.taskCount();

    const tasks = [];
    for (let i = 0; i < count; i++){
        const task = await dao.tasks(i);
        tasks.push({
            id: i,
            description: task.description,
            assignedTo: task.assignedTo,
            reward: task.reward.toString(),
            isCompleted: task.isCompleted,
            isPaid: task.isPaid,
        })
    }
        dispatch(setTasks(tasks))

    } catch (error) {
        dispatch(setError(error.message))
    }
}
// create task(only owner)
export const createTask = ({description, assignedTo, reward} ) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const dao = await getDAOContract(signer)

        const tx = await dao.createTask( description, assignedTo, reward )
        await tx.wait()
        dispatch(fetchTasks()) //refreh tasks
        toast.success("Task created successfully!");
    } catch (error) {
        dispatch(setError(error.message))
    }
}

// markTaskAsCompleted (only assignee )
export const markTaskAsComplete = ({ taskId }) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const dao = await getDAOContract(signer)

        const tx = await dao.markTaskAsCompleted( taskId )
        await tx.wait()
        dispatch(fetchTasks()) //refreh tasks
        toast.success("Task created successfully!");
    } catch (error) {
        dispatch(setError(error.message))
    }
}

//rewardTask (owner only)
export const rewardTasks = ({taskId }) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const dao = await getDAOContract(signer)

        const tx = await dao.rewardTask(taskId)
        await tx.wait()
        dispatch(fetchTasks()) //refreh tasks
        toast.success("Task created successfully!");
    } catch (error) {
        dispatch(setError(error.message))
    }
}
