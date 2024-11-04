import request from "../utils/reuqest";

export function login(username: string, password: string) {
    return request({
        url: '/login/', 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { username, password }, 
    });
}







