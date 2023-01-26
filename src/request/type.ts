// 返回res.data的interface
export type Response<T = any> = {
    code: number | string;
    data: T;
    message: string;
}
