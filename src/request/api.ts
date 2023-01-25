import instance from "./request"

export const PhoneLoginApi = (password: number) => instance.post("/login/cellphone", password)

export const LoginStatusApi = () => instance.get("/login/status")