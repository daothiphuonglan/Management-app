import Banner from './Components/Banner/Banner';
import PageNotFound from './PageNotFound';
import TaskChartPage from './Page/TaskChartPage';
import LogIn from './Components/LogIn/LogIn';
import { checkToken } from './api';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Tasks from './Components/Tasks/Tasks';

const AppContent = ({ setMessage }) => {
  const location = useLocation();
  const token = checkToken();
  const isLoginPage = location.pathname === '/login';

  if (!token && !isLoginPage) {
    setMessage("You must login !");
    return <Navigate to="/login" />;
  }

  return (
    <div className="app">
      {!isLoginPage && <Banner />}
      <Routes>
        <Route
          path="/"
          element={token ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route
          path="/task-chart"
          element={token ? <TaskChartPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LogIn setMessage={setMessage} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppContent;
