import React from 'react';
import Footer from '../components/Footer';
import TopNavbar from '../components/Navbar';
import UserListContainer from '../components/UserList/UserListContainer';

export default function HomePage() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <TopNavbar />
      <div
        style={{
          margin: '60px 0px 20px',
        }}
      >
        <UserListContainer/>
      </div>
      <Footer />
    </div>
  );
}
