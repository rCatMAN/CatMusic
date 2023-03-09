import request from "../request"
import { Response } from '../type'
export const songUrlApi = (id: number) =>
    request.get<Response>(
        `/music/song/url/v1?id=${id}&level=standard`
    )
export const videoUrlApi = (vid: number) =>
    request.get<Response>(
        `/music/video/url?id=${vid}`
    )
export const mvUrlApi = (id: number) =>
    request.get<Response>(
        `/music/mv/url?id=${id}`
    )