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
