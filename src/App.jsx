
import { createContext, useState } from "react";
import {
  RouterProvider,
} from "react-router-dom";
import Alert from "./components/shared/Alert";
import { router } from './routes';
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
export const AlertContext = createContext()

function App() {
  const [alert, setAlert] = useState(null);
  const handleShowAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => { setAlert(null) }, 2000);
  }
  return (
    <div>

      <AlertContext.Provider value={handleShowAlert}>
        <AuthProvider>
          <Navbar />

          <div className="lg:mt-[5rem] overflow-hidden font-Didot bg-dark">

            <RouterProvider router={router} />
          </div>
          <Footer />
        </AuthProvider>
      </AlertContext.Provider>
      {alert && <Alert type={alert.type} text={alert.text} />}
    </div>
  )
}

export default App
