import request from "../request"
import { Response } from '../type'
export const personalizedListApi = () =>
    request.get<Response>(
        '/music/personalized?limit=5',
    )