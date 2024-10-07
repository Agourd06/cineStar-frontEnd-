import { logoutUser } from "./AuthUtils";


export function userId() {
    const token = localStorage.getItem('token');
    if (!token) {
        logoutUser()
        return
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.UserInfo.userId;

    return id;
};

