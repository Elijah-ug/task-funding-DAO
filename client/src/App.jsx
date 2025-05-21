import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Nav from "./components/Nav";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      {/* <Container/> */}
      <Nav/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="task-form" element={<TaskForm/>}></Route>
          <Route path="task-list" element={<TasksList/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
