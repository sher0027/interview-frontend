import request from "../utils/reuqest";

export function fetchRecord(rid: string, seq?: number){
    const url = seq ? `/record/${rid}/${seq}/` : `/record/${rid}/`;
    return request({
        url: url, 
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function updateRecordStatus(rid: string, status: string){
    return request({
        url: `/record/${rid}/`, 
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        data: status
    });
}
