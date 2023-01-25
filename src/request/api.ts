import instance from "./request"

export const PhoneLoginApi = (password: number | undefined, phone: string | undefined) => instance.post(`/login/cellphone?password=${password}&phone=${phone}`)

export const LoginStatusApi = () => instance.get("/login/status")