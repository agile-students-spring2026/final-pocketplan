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
import TasksForToday from './components/TasksForToday';
import TaskCompleted from './components/TaskCompleted';
import DayEditView from './components/DayEditView';
import DeleteTaskConfirm from './components/DeleteTaskConfirm';
const SCREENS = {
  SIGNUP_EMAIL: 'signup-email',
  LOGIN: 'login',
  SIGNUP_PASSWORD: 'signup-password',
  FORGOT: 'forgot',
  WEEK: 'week',
  DAY: 'day',
  ADD: "add",
  EDIT: "edit",
  TODAY: "today",
  COMPLETED: "completed",
  DAY_EDIT_VIEW: "day-edit-view",
  DELETE_CONFIRM: "delete-confirm",
};

function App() {
  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);
  const [selectedDay, setSelectedDay] = useState("");
  const[tasks, setTasks] = useState([]);
  const[selectedTask, setSelectedTask] = useState(null);
  const [completedTask, setCompletedTask] = useState(null);
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
            if (day === "Today") {
              setScreen(SCREENS.TODAY);
            } else {
              setScreen(SCREENS.DAY);
            }
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
      {screen === SCREENS.TODAY && (
        <TasksForToday
          tasks={tasks.filter((task) => task.day === "Today")}
          onBack={() => setScreen(SCREENS.WEEK)}
          onAddTask={() => setScreen(SCREENS.ADD)}
          onOpenEditView={() => setScreen(SCREENS.DAY_EDIT_VIEW)}
          onToggleTask={(taskToToggle) => {
            if (!taskToToggle.completed) {
              const updatedTasks = tasks.map((task) =>
                task === taskToToggle ? { ...task, completed: true } : task
              );
              setTasks(updatedTasks);
              setCompletedTask({ ...taskToToggle, completed: true });
              setScreen(SCREENS.COMPLETED);
            } else {
              const updatedTasks = tasks.map((task) =>
                task === taskToToggle ? { ...task, completed: false } : task
              );
              setTasks(updatedTasks);
            }
          }}
        />
      )}
      {screen === SCREENS.COMPLETED && (
        <TaskCompleted
          completedTask={completedTask}
          onBack={() => setScreen(SCREENS.TODAY)}
          onDone={() => setScreen(SCREENS.TODAY)}
        />
      )}
      {screen === SCREENS.DAY_EDIT_VIEW && (
        <DayEditView
          tasks={tasks.filter((task) => task.day === "Today")}
          onBack={() => setScreen(SCREENS.TODAY)}
          onSelectTask={(task) => {
            setSelectedTask(task);
            setScreen(SCREENS.EDIT);
          }}
        />
      )}
      {screen === SCREENS.ADD && (
        <AddTask 
        onBack={() => {
          if (selectedDay === "Today") {
            setScreen(SCREENS.TODAY);
          } else {
            setScreen(SCREENS.DAY);
          }
        }}
        onSaveTask={(newTask) => {
          const taskWithday = {
            ...newTask,
            day: selectedDay,
            completed: false,
          };
          setTasks([...tasks, taskWithday]);
          if (selectedDay === "Today") {
            setScreen(SCREENS.TODAY);
          } else {
            setScreen(SCREENS.DAY);
          }
        }}
        />
      )}
      {screen === SCREENS.EDIT &&(
        <EditTask 
          onBack={() => setScreen(SCREENS.DAY_EDIT_VIEW)}
          task={selectedTask}
          onSaveTask={(updatedTask) =>{
            const updatedTasks = tasks.map((task) =>
              task === selectedTask ? updatedTask : task);
            setTasks(updatedTasks);
            setScreen(SCREENS.DAY_EDIT_VIEW);
          }}
          onDeleteTask={() => {
            setScreen(SCREENS.DELETE_CONFIRM);
          }}
        />
      )}
      {screen === SCREENS.DELETE_CONFIRM && (
        <DeleteTaskConfirm
          task={selectedTask}
          onBack={() => setScreen(SCREENS.EDIT)}
          onCancel={() => setScreen(SCREENS.EDIT)}
          onConfirmDelete={() => {
            const updatedTasks = tasks.filter(
              (task) => task !== selectedTask
            );
            setTasks(updatedTasks);
            setScreen(SCREENS.DAY_EDIT_VIEW);
          }}
        />
      )}
    </div>
  );
}

export default App;
