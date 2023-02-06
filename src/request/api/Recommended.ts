import request from "../request"
import { Response } from '../type'
export const personalizedListApi = () =>
    request.get<Response>(
        '/music/personalized?limit=5',
    )

export const recommendListDailyApi = ()=>
    request.get<Response>(
        '/music/recommend/resource',
    )

export const recommendDjApi = ()=>
    request.get<Response>(
        '/music/dj/recommend',
    ) 

export const personalFmApi = ()=>
    request.get<Response>(
        '/music/personal_fm',
    )
