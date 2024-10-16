export const CheckForConnection = () => {
    const token = localStorage.getItem('token');
    const tokenTime = localStorage.getItem('tokenTime');

    if (!token || !tokenTime) {
        return null;
    }

    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000;

    if (currentTime - tokenTime > oneHour) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTime');
        return null;
    }
};
