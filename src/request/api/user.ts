import request from "../request"
import { Response } from '../type'
export const phoneLoginApi = (phone: string, password: number) =>
    request.post<Response>(
        '/music/login/cellphone',
        { phone, password }
    )

export const qrcodeKeyApi = () =>
    request.get<Response>(
        `/music/login/qr/key?timerstamp=${Date.parse(new Date().toString())}`,
    )

export const qrcodeCreateApi = (qrkey: string) =>
    request.get<Response>(
        `/music/login/qr/create?key=${qrkey}&qrimg=${true}&timerstamp=${Date.parse(new Date().toString())}`,
    )

export const qrcodeCheckApi = {
    checkHook:
        (qrkey: string) =>
            request.get<Response>(
                `/music/login/qr/check?key=${qrkey}&timerstamp=${Date.parse(new Date().toString())}`,
            ),
    Interval: 2000,
}

export const getLoginStatusApi = () =>
    request.get<Response>(
        `/music/login/status?timerstamp=${Date.parse(new Date().toString())}`,
    )
    
export const signOutApi = ()=>
    request.get<Response>(
        `/music/logout?timerstamp=${Date.parse(new Date().toString())}`,
    )
