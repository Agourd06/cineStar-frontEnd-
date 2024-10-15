import { useContext } from "react";
import AuthContext from "../context/AuthContext";



export function userId() {
    const { logout } = useContext(AuthContext)
    const token = localStorage.getItem('token');
    if (!token) {
        // logout()
        return
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.UserInfo.userId;

    return id;
};

