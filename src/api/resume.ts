import request from "../utils/reuqest";

export function uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    return request.post('/upload_pdf/', formData);
}

export function fetchResume(){
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