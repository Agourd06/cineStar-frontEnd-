
import { createContext, useState } from "react";
import {
  RouterProvider,
} from "react-router-dom";
import Alert from "./components/shared/Alert";
import { router } from './routes';
import Navbar from "./components/navbar/navbar";
export const AlertContext = createContext()

function App() {
  const [alert, setAlert] = useState(null);
  const handleShowAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => { setAlert(null) }, 2000);
  }
  return (
    <div>
            <Navbar />

      <AlertContext.Provider value={handleShowAlert}>
        <div className="lg:mt-[5rem] overflow-hidden">

        <RouterProvider router={router} />
        </div>
      </AlertContext.Provider>
      {alert && <Alert type={alert.type} text={alert.text} />}
    </div>
  )
}

export default App
