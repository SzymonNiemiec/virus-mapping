import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from '../Shared/GlobalStyle';
// import AuthenticatedRoute from "./AuthenticatedRoute";
// import UnauthenticatedRoute from "./UnauthenticatedRoute";
// import NavigationContainer from "../Navigation/NavigationContainer";
// import DoctorDashboardContainer from "../DashboardPage/DoctorDashboard/DoctorDashboardContainer";
import HomeContainer from '../HomePage/HomeContainer';

function AppRouter({ isAuthenticated, user, loading }) {
  return (
    <Router>
      <GlobalStyle />
      {/* <NavigationContainer user={user} isAuthenticated={isAuthenticated} /> */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FAFCFF',
        minHeight: 'calc(100vh - 60px)',
        justifyContent: 'center'
      }}>
          {/* 
        {user.activeRole === "Doctor" ? <AuthenticatedRoute path="/(|calendar|patients)/:patientId?/:currentTab?" isAuthenticated={isAuthenticated} loading={loading} component={() => (
          <SidebarWrapper>
            <DoctorSidebarContainer />
          </SidebarWrapper>
        )} /> : user.activeRole === "Registry" ? <AuthenticatedRoute path="/(|patients)/:patientId?/:currentTab?" isAuthenticated={isAuthenticated} loading={loading} component={() => (
          <SidebarWrapper>
            <ReceptionistSidebarContainer />
          </SidebarWrapper>
        )} /> : <AuthenticatedRoute path="/(|employees|payments|healthcenters|statistics|profile)/" isAuthenticated={isAuthenticated} loading={loading} component={() => (
          <SidebarWrapper>
            <AdminSidebarContainer />
          </SidebarWrapper>
        )} />} */}



        <Switch>
            <Route path="/" exact component={HomeContainer} />
          {/* <AuthenticatedRoute path="/" exact component={user.activeRole === "Doctor" ? DoctorDashboardContainer : user.activeRole === "Admin" ? AdminDashboardContainer : ReceptionistCalendarContainer} isAuthenticated={isAuthenticated} loading={loading} />
          <AuthenticatedRoute path="/calendar" exact component={user.activeRole === "Doctor" ? DoctorCalendarContainer : ReceptionistCalendarContainer} isAuthenticated={isAuthenticated} loading={loading} />
          <AuthenticatedRoute path="/patients/:patientId?/:currentTab?" exact component={user.activeRole === "Doctor" ? DoctorPatientInfoContainer : ReceptionistPatientInfoContainer} isAuthenticated={isAuthenticated} loading={loading} />
          <AuthenticatedRoute path="/profile" exact component={user.activeRole === "Doctor" ? DoctorProfileContainer : user.activeRole === "Admin" ? AdminProfileContainer : ReceptionistProfileContainer} isAuthenticated={isAuthenticated} loading={loading} />
          {user.activeRole === "Doctor" && <AuthenticatedRoute path="/visit/:id" exact component={VisitContainer} isAuthenticated={isAuthenticated} loading={loading} />}
          {user.activeRole === "Admin" && <AuthenticatedRoute path="/employees" exact component={EmployeesContainer} isAuthenticated={isAuthenticated} loading={loading} />}
          {user.activeRole === "Admin" && <AuthenticatedRoute path="/payments" exact component={PaymentsContainer} isAuthenticated={isAuthenticated} loading={loading} />}
          {user.activeRole === "Admin" && <AuthenticatedRoute path="/healthcenters" exact component={HealthcentersContainer} isAuthenticated={isAuthenticated} loading={loading} />}
          {user.activeRole === "Admin" && <AuthenticatedRoute path="/statistics" exact component={StatisticsContainer} isAuthenticated={isAuthenticated} loading={loading} />}
          <UnauthenticatedRoute path="/logout" exact component={LogoutContainer} loading={loading} />
          <UnauthenticatedRoute path="/login" exact component={LoginContainer} loading={loading} />
          <UnauthenticatedRoute exact component={NotFoundPageContainer} loading={loading} /> */}

        </Switch>
      </div>
    </Router>
  );
}


export default AppRouter;


const SidebarWrapper = styled.div`
width: 300px;
min-width: 300px;
border-right: 2px solid ${({ theme }) => theme.grey};
height: calc(100vh - 60px);
background-color: #fff;
`;