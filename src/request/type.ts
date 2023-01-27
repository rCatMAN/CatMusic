export type Response<T = any> = {
    code: number | string;
    data: T;
    message: string;
}
