// client/src/context/AppContext.jsx

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userUUID, setUserUUID] = useState(null);
  const [roomID, setRoomID] = useState(null);

  return (
    <AppContext.Provider value={{ userUUID, setUserUUID, roomID, setRoomID }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
