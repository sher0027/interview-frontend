import request from "../utils/reuqest";

export function evaluate(eid: string){
    return request({
        url: `/evaluation/${eid}/`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function fetchEvaluation(eid: string, seq?: number){
    const url = seq ? `/evaluation/${eid}/${seq}/` : `/evaluation/${eid}/`;
    return request({
        url: url, 
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
