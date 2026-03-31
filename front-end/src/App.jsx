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
import { getTodayISO, getCurrentWeekDays, formatDisplayDate } from './utils/dates';

const SCREENS = {
  SIGNUP_EMAIL: 'signup-email',
  LOGIN: 'login',
  SIGNUP_PASSWORD: 'signup-password',
  FORGOT: 'forgot',
  ONBOARDING: 'onboarding',
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  EDIT_PROFILE: 'edit-profile',
  WEEK: 'week',
  DAY: 'day',
  TODAY: 'today',
  ADD: 'add',
  EDIT: 'edit',
  COMPLETED: 'completed',
  DAY_EDIT_VIEW: 'day-edit-view',
  DELETE_CONFIRM: 'delete-confirm',
};

function App() {
  const todayISO = getTodayISO();
  const weekDays = getCurrentWeekDays();

  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);
  const [selectedDay, setSelectedDay] = useState(todayISO);
  const [editTaskSource, setEditTaskSource] = useState(SCREENS.DAY_EDIT_VIEW);
  const [isNewUser, setIsNewUser] = useState(true);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTask, setCompletedTask] = useState(null);

  const currentDayLabel = `Today, ${formatDisplayDate(todayISO)}`;

  const handleLogOut = () => { setScreen(SCREENS.LOGIN); };
  const handleDeleteAccount = () => { setScreen(SCREENS.SIGNUP_EMAIL); };
  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setScreen(SCREENS.PROFILE);
  };

  const openEditTask = (task, source) => {
    setSelectedTask(task);
    setEditTaskSource(source);
    setScreen(SCREENS.EDIT);
  };

  const afterEditSave = (updatedTask) => {
    setTasks(tasks.map((t) => (t === selectedTask ? updatedTask : t)));
    setScreen(editTaskSource);
  };

  const afterDeleteConfirm = () => {
    setTasks(tasks.filter((t) => t !== selectedTask));
    setScreen(editTaskSource);
  };

  const todayTasks = tasks.filter((t) => t.dueDate === todayISO);

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
          onLogin={() => {
            if (isNewUser) {
              setIsNewUser(false);
              setScreen(SCREENS.ONBOARDING);
            } else {
              setScreen(SCREENS.DASHBOARD);
            }
          }}
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
      {screen === SCREENS.ONBOARDING && (
        <Onboarding
          onBack={() => setScreen(SCREENS.LOGIN)}
          onFinish={() => setScreen(SCREENS.DASHBOARD)}
        />
      )}
      {screen === SCREENS.DASHBOARD && (
        <Dashboard
          tasks={tasks}
          todayISO={todayISO}
          weekDays={weekDays}
          currentDayLabel={currentDayLabel}
          onProfileClick={() => setScreen(SCREENS.PROFILE)}
          onWeekClick={() => setScreen(SCREENS.WEEK)}
          onTodayClick={() => {
            setSelectedDay(todayISO);
            setScreen(SCREENS.TODAY);
          }}
        />
      )}
      {screen === SCREENS.PROFILE && (
        <Profile
          profile={profile}
          tasks={tasks}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
          onEditProfile={() => setScreen(SCREENS.EDIT_PROFILE)}
          onLogOut={handleLogOut}
        />
      )}
      {screen === SCREENS.EDIT_PROFILE && (
        <EditProfile
          profile={profile}
          onBack={() => setScreen(SCREENS.PROFILE)}
          onSaveProfile={handleSaveProfile}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
      {screen === SCREENS.WEEK && (
        <WeekView
          tasks={tasks}
          weekDays={weekDays}
          todayISO={todayISO}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
          onSelectDay={(isoDate) => {
            setSelectedDay(isoDate);
            if (isoDate === todayISO) {
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
          onBack={() => setScreen(SCREENS.WEEK)}
          onAddTask={() => setScreen(SCREENS.ADD)}
          onEditTask={(task) => openEditTask(task, SCREENS.DAY)}
        />
      )}
      {screen === SCREENS.TODAY && (
        <TasksForToday
          tasks={todayTasks}
          onBack={() => setScreen(SCREENS.WEEK)}
          onAddTask={() => setScreen(SCREENS.ADD)}
          onOpenEditView={() => setScreen(SCREENS.DAY_EDIT_VIEW)}
          onToggleTask={(taskToToggle) => {
            if (!taskToToggle.completed) {
              const updated = tasks.map((t) =>
                t === taskToToggle ? { ...t, completed: true } : t
              );
              setTasks(updated);
              setCompletedTask({ ...taskToToggle, completed: true });
              setScreen(SCREENS.COMPLETED);
            } else {
              setTasks(tasks.map((t) =>
                t === taskToToggle ? { ...t, completed: false } : t
              ));
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
          tasks={todayTasks}
          onBack={() => setScreen(SCREENS.TODAY)}
          onSelectTask={(task) => openEditTask(task, SCREENS.DAY_EDIT_VIEW)}
        />
      )}
      {screen === SCREENS.ADD && (
        <AddTask
          weekDays={weekDays}
          initialDate={selectedDay}
          onBack={() => {
            if (selectedDay === todayISO) {
              setScreen(SCREENS.TODAY);
            } else {
              setScreen(SCREENS.DAY);
            }
          }}
          onSaveTask={(newTask) => {
            setTasks([...tasks, { ...newTask, completed: false }]);
            if (newTask.dueDate === todayISO) {
              setSelectedDay(todayISO);
              setScreen(SCREENS.TODAY);
            } else {
              setSelectedDay(newTask.dueDate);
              setScreen(SCREENS.DAY);
            }
          }}
        />
      )}
      {screen === SCREENS.EDIT && (
        <EditTask
          onBack={() => setScreen(editTaskSource)}
          task={selectedTask}
          onSaveTask={afterEditSave}
          onDeleteTask={() => setScreen(SCREENS.DELETE_CONFIRM)}
        />
      )}
      {screen === SCREENS.DELETE_CONFIRM && (
        <DeleteTaskConfirm
          task={selectedTask}
          onBack={() => setScreen(SCREENS.EDIT)}
          onCancel={() => setScreen(SCREENS.EDIT)}
          onConfirmDelete={afterDeleteConfirm}
        />
      )}
    </div>
  );
}

export default App;
