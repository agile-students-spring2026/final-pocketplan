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
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Onboarding from './components/Onboarding';
import EditProfile from './components/EditProfile';
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
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  WEEKVIEW: 'weekview',
  ONBOARDING: 'onboarding',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);
  const [selectedDay, setSelectedDay] = useState("");
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });
  const handleLogOut = () => { setScreen(SCREENS.LOGIN); };
  const handleDeleteAccount = () => { setScreen(SCREENS.SIGNUP_EMAIL); };
  const handleSaveProfile = (updatedProfile) => { setProfile(updatedProfile); setScreen(SCREENS.PROFILE); }
  const[tasks, setTasks] = useState([]);
  const[selectedTask, setSelectedTask] = useState(null);
  const [completedTask, setCompletedTask] = useState(null);
  const currentDate = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = `Today, ${daysOfWeek[currentDate.getDay()]}`;
  const handleProfileClick = () => { setScreen(SCREENS.PROFILE); };
  const handleWeekClick = () => { setScreen(SCREENS.WEEK); };
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
          onLogin={() => setScreen(SCREENS.ONBOARDING)}
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
      {screen === SCREENS.ONBOARDING && <Onboarding onFinish={() => setScreen(SCREENS.DASHBOARD)} />}
      {screen === SCREENS.DASHBOARD && (
        <Dashboard
          tasks={tasks}
          currentDay={currentDay}
          onProfileClick={handleProfileClick} 
          onWeekClick={handleWeekClick} 
        />
      )}
      {screen === SCREENS.PROFILE && <Profile profile={profile} onBack={() => setScreen(SCREENS.DASHBOARD)} onEditProfile={() => setScreen(SCREENS.EDIT_PROFILE)} onLogOut={handleLogOut} />}
      {screen === SCREENS.EDIT_PROFILE && <EditProfile profile={profile} onBack={() => setScreen(SCREENS.PROFILE)} onSaveProfile={handleSaveProfile} onDeleteAccount={handleDeleteAccount} />}
      {screen === SCREENS.WEEK &&(
        <WeekView
          tasks={tasks}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
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
