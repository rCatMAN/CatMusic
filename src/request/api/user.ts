import request from "../request"
import { Response } from '../type'
export const phoneLoginApi = (phone: string, password: number) =>
    request<Response>({
        method: 'post',
        url: '/login/cellphone',
        data: { phone, password }

    })
