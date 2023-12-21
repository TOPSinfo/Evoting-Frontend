import './App.css';
import { LendingPage } from './components/LendingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Login } from './components/Login';
import { UserDashboard } from './components/user/UserDashboard';
import React from "react";
import './cssFiles/app.css'
import Home from './pages/Home';
import Registeration from './pages/RegisterationPage';
import UserDetailsPage from './pages/UserDetailsPage';
import Voting from './pages/VotingPage';
import Results from './pages/ResultsPage';
import AdminHome from './pages/AdminHome';
import AdminCandidateListPage from './pages/AdminCandidateListPage';
import AdminAddCandidate from './pages/AdminAddCandidate';
import AdminApproveVoter from './pages/AdminApproveVoter';
import AdminChangePhase from './pages/AdminChangeVotingPhase';
import AdminResults from './pages/AdminResultsPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LendingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<UserDashboard />} />
          <Route exact path='/user' element={<Home />} />
          <Route exact path='/user/registration' element={<Registeration />} />
          <Route exact path='/user/userdetails' element={<UserDetailsPage />} />
          <Route exact path='/user/voting' element={<Voting />} />
          <Route exact path='/user/results' element={<Results />} />
          <Route exact path='/admin/dashboard' element={<AdminHome />} />
          <Route exact path='/admin/candidatesList' element={<AdminCandidateListPage />} />
          <Route exact path='/admin/addCandidates' element={<AdminAddCandidate />} />
          <Route exact path='/admin/approveVoter' element={<AdminApproveVoter />} />
          <Route exact path='/admin/changePhase' element={<AdminChangePhase />} />
          <Route exact path='/admin/results' element={<AdminResults />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
