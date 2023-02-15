import request from "../request"
import { Response } from '../type'
export const songUrlApi = (id: number) =>
    request.get<Response>(
        `/music/song/url/v1?id=${id}&level=standard`
    )