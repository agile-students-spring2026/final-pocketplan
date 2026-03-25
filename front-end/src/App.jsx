import React, { useState } from 'react';
import './auth.css';
import SignUpEmail from './components/SignUpEmail';
import LoginScreen from './components/LoginScreen';
import SignUpPassword from './components/SignUpPassword';
import ForgotPassword from './components/ForgotPassword';
import WeekView from "./components/WeekView";
import DayTaskList from './components/DayTaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask.jsx';
const SCREENS = {
  SIGNUP_EMAIL: 'signup-email',
  LOGIN: 'login',
  SIGNUP_PASSWORD: 'signup-password',
  FORGOT: 'forgot',
  WEEK: 'week',
  DAY: 'day',
  ADD: "add",
  EDIT: "edit",
};

function App() {
  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);
  const [selectedDay, setSelectedDay] = useState("");
  const[tasks, setTasks] = useState([]);
  const[selectedTask, setSelectedTask] = useState(null);
  return (
    <div className="auth-page">
      {screen === SCREENS.SIGNUP_EMAIL && (
        <SignUpEmail
          onNext={() => setScreen(SCREENS.SIGNUP_PASSWORD)}
          onGoLogin={() => setScreen(SCREENS.LOGIN)}
        />
      )}
      {screen === SCREENS.LOGIN && (
        <LoginScreen
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onLogin={() => setScreen(SCREENS.WEEK)}
          onForgotPassword={() => setScreen(SCREENS.FORGOT)}
        />
      )}
      {screen === SCREENS.SIGNUP_PASSWORD && (
        <SignUpPassword
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onNext={() => setScreen(SCREENS.LOGIN)}
        />
      )}
      {screen === SCREENS.FORGOT && (
        <ForgotPassword onBack={() => setScreen(SCREENS.LOGIN)} />
      )}
      {screen === SCREENS.WEEK &&(
        <WeekView
          tasks={tasks}
          onBack={() => setScreen(SCREENS.LOGIN)}
          onSelectDay={(day) => {
            setSelectedDay(day);
            setScreen(SCREENS.DAY);
          }}
        />
      )}
      {screen === SCREENS.DAY && (
        <DayTaskList
          day={selectedDay}
          tasks={tasks}
          onBack={()=>setScreen(SCREENS.WEEK)}
          onAddTask={() => setScreen(SCREENS.ADD)}
          onEditTask={(task) => {
            setSelectedTask(task);
            setScreen(SCREENS.EDIT);
          }}
        />
      )}
      {screen === SCREENS.ADD && (
        <AddTask 
        onBack={() => setScreen(SCREENS.DAY)}
        onSaveTask={(newTask) => {
          const taskWithday = {
            ...newTask,
            day: selectedDay,
          };
          setTasks([...tasks, taskWithday]);
          setScreen(SCREENS.DAY);
        }}
        />
      )}
      {screen === SCREENS.EDIT &&(
      <EditTask 
        onBack={() => setScreen(SCREENS.DAY)}
        task={selectedTask}
        onSaveTask={(updatedTask) =>{
          const updatedTasks = tasks.map((task) =>
            task === selectedTask ? updatedTask : task);
          setTasks(updatedTasks);
          setScreen(SCREENS.DAY);
        }}
          onDeleteTask={() => {
          const updatedTasks = tasks.filter(
            (task) => task !== selectedTask);
          setTasks(updatedTasks);
          setScreen(SCREENS.DAY);
        }}
      />
    )}
    </div>
  );
}

export default App;
