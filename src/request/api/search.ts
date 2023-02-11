import request from "../request"
import { Response } from '../type'
export const searchSongApi = (keywords: string) =>
    request.get<Response>(
        `/music/cloudsearch?keywords=${keywords}&type=1&limit=16`
    )
export const searchArtistApi = (keywords: string) =>
    request.get<Response>(
        `/music/search?keywords=${keywords}&type=100`
    )
export const searchAlbumApi = (keywords: string) =>
    request.get<Response>(
        `/music/search?keywords=${keywords}&type=10`
    )
export const searchVideoApi = (keywords: string) =>
    request.get<Response>(
        `/music/search?keywords=${keywords}&type=1014`
    )