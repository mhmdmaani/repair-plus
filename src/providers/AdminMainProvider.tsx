'use client';
import AdminWrapper from '@/shared/layout/AdminWrapper';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminMainWrapper = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <AdminWrapper>
      <div>{children}</div>
      <ToastContainer />
    </AdminWrapper>
  );
};

export default AdminMainWrapper;
