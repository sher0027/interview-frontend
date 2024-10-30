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

export function sendChatMessage(userMessage: string) {
    return request({
        url: '/send_chat_message/', 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { prompt: userMessage }, 
    });
}

interface UploadAudioResponse {
    transcript: string;
}

export function uploadAudio(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return request.post<UploadAudioResponse>('/upload_audio/', formData);
}

export function uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    return request.post('/upload_pdf/', formData);
}

export function getResume(){
    return request({
        url: '/resume/', 
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function updateResume(resumeInfo: any){
    return request({
        url: '/resume/', 
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        data: resumeInfo, 
    });
}