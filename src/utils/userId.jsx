import { useContext } from "react";
import AuthContext from "../context/AuthContext";



export function userId() {
    const token = localStorage.getItem('token');
   
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.UserInfo.userId;

    return id;
};

