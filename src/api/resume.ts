import request from "../utils/reuqest";

export function uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    return request.post('/upload_pdf/', formData);
}


export function fetchResume(version?: number){
    const url = version ? `/resume/${version}/` : `/resume/`;
    return request({
        url: url, 
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function updateResume(version: number, resumeInfo: any){
    return request({
        url: `/resume/${version}/`, 
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        data: resumeInfo, 
    });
}