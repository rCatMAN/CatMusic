import request from "../request"
import { Response } from '../type'
export const songLyricApi = (id: number | string) =>
    request.get<Response>(
        `/music/lyric/new?id=${id}`,
    )
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
export const artistDetailApi = (id: any) =>
    request.get<Response>(
        `/music/artist/detail?id=${id}`
    )
export const albumDetailApi = (id: any) =>
    request.get<Response>(
        `/music/album?id=${id}`
    )
export const artistHotSongAPi = (id: any) =>
    request.get<Response>(
        `/music/artist/top/song?id=${id}`
    )
export const artistAlbumAPi = (id: any, offset: number) =>
    request.get<Response>(
        `/music/artist/album?id=${id}&limit=10&offset=${offset}`
    )
export const artistMvAPi = (id: any) =>
    request.get<Response>(
        `/music/artist/mv?id=${id}`
    )
export const similarArtistApi = (id: any) =>
    request.get<Response>(
        `/music/simi/artist?id=${id}`
    )