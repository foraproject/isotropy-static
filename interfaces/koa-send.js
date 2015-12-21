declare module "koa-send" {

    declare type KoaContextType = {
        code: number;
        redirect: (url: string) => void;
        method: string;
        path: string;
        status: number;
    }

    declare type KoaSendOptionsType = {
        index?: bool | string,
        root?: string,
        defer?: boolean
    };

    declare function exports(context: KoaContextType, path: string, opts: KoaSendOptionsType) : void;
}
