import request from "../utils/reuqest";

export function login(username: string, password: string) {
    const action = "login"
    return request({
        url: '/login/', 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { username, password, action }, 
    });
}


export function register(username: string, password: string) {
    const action = "register"
    return request({
        url: '/login/', 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { username, password, action }, 
    });
}







