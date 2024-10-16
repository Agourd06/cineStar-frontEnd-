
import { createContext, useState } from "react";
import {
  RouterProvider,
} from "react-router-dom";
import Alert from "./components/shared/Alert";
import { router } from './routes';
import { AuthProvider } from "./context/AuthContext";
import  { SideBarProvider } from "./context/SideBarContext";
import { CheckForConnection } from "./middleWares/CheckForConnection";
export const AlertContext = createContext()

function App() {
  const [alert, setAlert] = useState(null);
  const handleShowAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => { setAlert(null) }, 2000);
  }

  CheckForConnection()
  return (
    <div>

      <AlertContext.Provider value={handleShowAlert}>
        <AuthProvider>
          <SideBarProvider>
            <div className=" overflow-hidden font-Didot bg-dark">

              <RouterProvider router={router} />
            </div>
          </SideBarProvider>
        </AuthProvider>
      </AlertContext.Provider>
      {alert && <Alert type={alert.type} text={alert.text} />}
    </div>
  )
}

export default App
