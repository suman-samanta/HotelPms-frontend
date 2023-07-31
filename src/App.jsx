
import React, { useContext } from "react";

import { GetApp } from './Utils/helpers';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from "./Context/Context"
import { RoomProvider } from './Context/RoomContext';


function App() {
  const CurrentApp = GetApp();

  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <RoomProvider>
            <CurrentApp />
          </RoomProvider>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
