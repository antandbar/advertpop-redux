import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage/LoginPage';
import Layout from './components/layout/Layout';
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage';
import RequireAuth from './components/auth/RequireAuth';
import AdvertPage from './components/adverts/AdvertPage/AdvertPage';
import NewAdvertPage from './components/adverts/NewAdvertPage/NewAdvertPage';
import Error404 from './components/error/Error404';


function App() {

  return (
    <div className="App">
        {/* desde Routes se utiliza el layout */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/adverts"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<AdvertsPage />} />
            <Route path=":id" element={<AdvertPage />} />
            <Route path="/adverts/new" element={<NewAdvertPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route
            path="/404"
            element={
              <RequireAuth>
                <Error404 />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    </div>
  );
}

export default App;
