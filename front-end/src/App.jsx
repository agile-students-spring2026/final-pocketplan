import React, { useEffect, useState } from 'react';
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
import BottomNav from './components/BottomNav';
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

const BOTTOM_NAV_SCREENS = new Set([
  SCREENS.DASHBOARD,
  SCREENS.WEEK,
  SCREENS.TODAY,
  SCREENS.PROFILE,
]);

function normalizeTask(task) {
  return { ...task, id: task.id || task._id };
}

function App() {
  const todayISO = getTodayISO();
  const weekDays = getCurrentWeekDays();

  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);
  const [selectedDay, setSelectedDay] = useState(todayISO);
  const [editTaskSource, setEditTaskSource] = useState(SCREENS.DAY_EDIT_VIEW);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTask, setCompletedTask] = useState(null);
  const [signupEmail, setSignupEmail] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const currentDayLabel = `Today, ${formatDisplayDate(todayISO)}`;

  const API_BASE = process.env.REACT_APP_API_URL || '';

  function getAuthHeaders() {
    const token = localStorage.getItem('pocketplan_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  const handleLogOut = async () => {
    await logoutUser();
    localStorage.removeItem('pocketplan_token');
    setTasks([]);
    setProfile({ name: '', email: '' });
    setScreen(SCREENS.LOGIN);
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('pocketplan_token');
    setTasks([]);
    setScreen(SCREENS.SIGNUP_EMAIL);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setScreen(SCREENS.PROFILE);
  };

  const openEditTask = (task, source) => {
    setSelectedTask(task);
    setEditTaskSource(source);
    setScreen(SCREENS.EDIT);
  };

  const afterEditSave = async (updatedTask) => {
    const result = await updateTask(updatedTask);

    if (result.success) {
      setScreen(editTaskSource);
    } else {
      setAuthMessage(result.error || 'Could not update task.');
    }
  };

  const afterDeleteConfirm = async () => {
    const result = await removeTask(selectedTask);

    if (result.success) {
      setScreen(editTaskSource);
    } else {
      setAuthMessage(result.error || 'Could not delete task.');
    }
  };

  const todayTasks = tasks.filter((t) => t.dueDate === todayISO);

  async function loadTasks() {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (data.success) {
        setTasks(data.tasks.map(normalizeTask));
      }

      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function createTask(newTask) {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newTask),
      });

      const data = await res.json();

      if (data.success) {
        setTasks((prev) => [...prev, normalizeTask(data.task)]);
      }

      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function updateTask(updatedTask) {
    try {
      const taskId = updatedTask.id || updatedTask._id;
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      if (data.success) {
        const normalized = normalizeTask(data.task);
        setTasks((prev) =>
          prev.map((t) => (t.id === normalized.id ? normalized : t))
        );
      }

      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function removeTask(taskToDelete) {
    try {
      const taskId = taskToDelete.id || taskToDelete._id;
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (data.success) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId && t._id !== taskId));
      }

      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function loginUser(email, password) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('pocketplan_token', data.token);
      }

      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function signupUser(name, email, password) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function forgotPasswordRequest(email) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  async function logoutUser() {
    try {
      const res = await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, error: 'Cannot connect to server.' };
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('pocketplan_token');
    if (token) {
      setScreen(SCREENS.DASHBOARD);
      loadTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBottomNav = BOTTOM_NAV_SCREENS.has(screen);

  return (
    <div className="auth-page">
      {authMessage && (
        <p style={{ color: '#dc2626', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {authMessage}
        </p>
      )}
      {screen === SCREENS.SIGNUP_EMAIL && (
        <SignUpEmail
          onNext={(email) => {
            setSignupEmail(email);
            setScreen(SCREENS.SIGNUP_PASSWORD);
          }}
          onGoLogin={() => setScreen(SCREENS.LOGIN)}
        />
      )}
      {screen === SCREENS.LOGIN && (
        <LoginScreen
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onLogin={async (email, password) => {
            const result = await loginUser(email, password);

            if (result.success) {
              if (result.user) {
                setProfile({ name: result.user.name, email: result.user.email });
              }
              await loadTasks();

              if (justSignedUp) {
                setJustSignedUp(false);
                setScreen(SCREENS.ONBOARDING);
              } else {
                setScreen(SCREENS.DASHBOARD);
              }
            }

            return result;
          }}
          onForgotPassword={() => setScreen(SCREENS.FORGOT)}
        />
      )}
      {screen === SCREENS.SIGNUP_PASSWORD && (
        <SignUpPassword
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onNext={async ({ name, password }) => {
            const result = await signupUser(name, signupEmail, password);

            if (result.success) {
              if (result.user) {
                setProfile({ name: result.user.name, email: result.user.email });
              }
              setJustSignedUp(true);
              setAuthMessage('Sign up successful. Please log in.');
              setScreen(SCREENS.LOGIN);
            }

            return result;
          }}
        />
      )}
      {screen === SCREENS.FORGOT && (
        <ForgotPassword
          onBack={() => setScreen(SCREENS.LOGIN)}
          onSubmitEmail={forgotPasswordRequest}
        />
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
          onToggleTask={async (taskToToggle) => {
            const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
            const result = await updateTask(updatedTask);

            if (result.success) {
              if (updatedTask.completed) {
                setCompletedTask(normalizeTask(result.task));
                setScreen(SCREENS.COMPLETED);
              }
            } else {
              setAuthMessage(result.error || 'Could not update task.');
            }
          }}
        />
      )}
      {screen === SCREENS.COMPLETED && (
        <TaskCompleted
          completedTask={completedTask}
          onBack={() => setScreen(SCREENS.TODAY)}
          onDone={async (finishedTask) => {
            const result = await updateTask({
              ...finishedTask,
              hoursSpent: finishedTask.hoursSpent,
              minutesSpent: finishedTask.minutesSpent,
              effortRating: finishedTask.effortRating,
              completionNotes: finishedTask.completionNotes,
            });

            if (result.success) {
              setScreen(SCREENS.TODAY);
            } else {
              setAuthMessage(result.error || 'Could not save completed task.');
            }
          }}
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
          onSaveTask={async (newTask) => {
            const result = await createTask(newTask);

            if (result.success) {
              if (newTask.dueDate === todayISO) {
                setSelectedDay(todayISO);
                setScreen(SCREENS.TODAY);
              } else {
                setSelectedDay(newTask.dueDate);
                setScreen(SCREENS.DAY);
              }
            } else {
              setAuthMessage(result.error || 'Could not create task.');
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
      {showBottomNav && (
        <BottomNav
          screen={screen}
          onDashboard={() => setScreen('dashboard')}
          onWeek={() => setScreen('week')}
          onToday={() => { setSelectedDay(todayISO); setScreen('today'); }}
          onProfile={() => setScreen('profile')}
        />
      )}
    </div>
  );
}

export default App;
