import React from 'react';
import useUserData from './useUserData';
import UserList from './UserList';

const UserListContainer = () => {
  const {
    users,
    columnFields,
    handleOnSearch,
    handleSort,
    sortColumn,
    sortDirection,
  } = useUserData();

  return (
    <UserList
      users={users}
      columnFields={columnFields}
      handleOnSearch={handleOnSearch}
      handleSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
    />
  );
};

export default UserListContainer;
