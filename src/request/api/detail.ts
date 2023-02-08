import request from "../request"
import { Response } from '../type'
export const songListDetailApi = (id: any) =>
    request.get<Response>(
        `/music/playlist/detail?id=${id}`,
    )