import request from "../utils/reuqest";

export function sendChatMessage(rid: string) {
    const companyInfo = JSON.parse(localStorage.getItem("companyInfo") || '{}');
    return request({
        url: '/send_chat_message/', 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            rid,
            companyInfo,
        },
    });
}


export function uploadAudio(file: File, rid: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('rid', rid); 

    return request.post('/upload_audio/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}