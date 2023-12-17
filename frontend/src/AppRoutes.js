import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminPage from './Pages/AdminPage';
import AcademicStaffPage from './Pages/AcademicStaffPage';
import StudentPage from './Pages/StudentPage';
import MaintenanceDivisionPage from './Pages/MaintenanceDivisionPage';
import AddRequest from './Pages/AddRequest';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminPage" element={<AdminPage />} />
      <Route path="/academicStaffPage" element={<AcademicStaffPage />} />
      <Route path="/studentPage/:Id" element={<StudentPage />} />
      <Route path="/maintenanceDivisionPage" element={<MaintenanceDivisionPage />} />
      <Route path="/add-request/:Id" element={<AddRequest />} />
    </Routes>
  );
}
