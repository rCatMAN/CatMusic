import request from "../request"
import { Response } from '../type'
export const songDetailApi = (id: number | string) =>
    request.get<Response>(
        `/music/song/detail?ids=${id}`,
    )
export const songListDetailApi = (id: any) =>
    request.get<Response>(
        `/music/playlist/detail?id=${id}`,
    )
export const songListApi = (id: any) =>
    request.get<Response>(
        `/music/playlist/track/all?id=${id}`
    )