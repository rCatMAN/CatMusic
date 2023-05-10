import request from "../request"
import { Response } from '../type'
export const commentApi = (id: number, type: number, page?: number, pageSize?: number, sortType?: number, cursor?: number) =>
    request.get<Response>(
        `/comment/new?id=${id}&type=${type}&pageNo=${page}&pageSize=${pageSize}&sortType=${sortType}&cursor=${cursor}`,
    )
export const commentLikeApi = (id: number, cid: number, t: boolean, type: number) =>
    request.get<Response>(
        `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`
    )
