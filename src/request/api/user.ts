import request from "../request"
import { Response } from '../type'
export const phoneLoginApi = (phone: string, password: number) =>
    request<Response>({
        method: 'post',
        url: '/login/cellphone',
        data: { phone, password }
    })
export const qrcodeKeyApi = () => 
    request<Response>({
        method:'post',
        url:'/login/qr/key'
    })
export const qrcodeCreatApi = (qrkey:string) => 
    request<Response>({
        method:'post',
        url:'/login/qr/create',
        data:{key:qrkey}
    })
export const qrcodeCheckApi ={
    checkHook:
    (qrkey:string) => 
    request<Response>({
        method:'post',
        url:'/login/qr/check',
        data:{key:qrkey}
    }),
    Interval:2000,
    }
