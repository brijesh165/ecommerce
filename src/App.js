import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Components
import AdminToolbar from './components/AdminToolbar/AdminToolbar.jsx';

// Hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth'

// Layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashBordLayout from './layouts/DashBordLayout';

// Pages
import './App.scss';
import HomePage from './Pages/Homepage/HomePage';
import Registration from './Pages/Registration/Registration';
import LoginPage from './Pages/LoginPage/LoginPage';
import Recovery from './Pages/Recovery/Recovery';
import Dashboard from './Pages/Dashboard/Dashboard';
import Admin from './Pages/Admin/Admin';

// Actions
import { checkUserSession } from './store/Actions/user.actions.';


const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <HomePage />
          </HomePageLayout>
        )} />

        <Route path="/login"
          render={() => (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )} />

        <Route path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />

        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />

        <Route path="/dashboard" render={() => (
          <WithAuth>
            <DashBordLayout>
              <Dashboard />
            </DashBordLayout>
          </WithAuth>
        )} />

        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />

      </Switch>
    </div>
  );
}

export default App;
