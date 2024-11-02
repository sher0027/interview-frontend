import Evaluation from './pages/Evalutation';
import History from './pages/History';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Login from './pages/Login';
import Resume from './pages/Resume';

interface RouteConfig {
  path: string;
  element: JSX.Element;
}

const routes: RouteConfig[] = [
  { path: '/', element: <Login /> },
  { path: '/home', element: <Home /> },
  { path: '/interview', element: <Interview /> },
  // { path: '/resume', element: <Resume />},
  { path: '/evaluation', element: <Evaluation /> },
  // { path: '/history', element: <History /> },
];

export default routes;
