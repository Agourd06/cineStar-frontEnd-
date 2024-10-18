import { useContext } from "react";
import AuthContext from "../context/AuthContext";



export function userId() {
    const token = localStorage.getItem('token');
    let id;
   if(token){
       const decodedToken = JSON.parse(atob(token.split('.')[1]));

        id = decodedToken.UserInfo.userId;
   }

    return id;
};

