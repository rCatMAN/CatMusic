import request from "../request"
import { Response } from '../type'
export const bannerApi = () =>
    request.get<Response>(
        '/music/banner?type=0',
    )

export const personalizedListApi = () =>
    request.get<Response>(
        '/music/personalized?limit=15',
    )

export const recommendListDailyApi = () =>
    request.get<Response>(
        '/music/recommend/resource',
    )

export const recommendDjApi = () =>
    request.get<Response>(
        '/music/dj/recommend',
    )

export const personalFmApi = () =>
    request.get<Response>(
        '/music/personal_fm',
    )
export const hotSingerApi = () =>
    request.get<Response>(
        '/music/top/artists?limit=6'
    )
