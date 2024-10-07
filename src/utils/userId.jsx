import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const { logout } = useContext(AuthContext)


export function userId() {
    const token = localStorage.getItem('token');
    if (!token) {
        logout()
        return
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.UserInfo.userId;

    return id;
};

