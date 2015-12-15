declare module "koa-send" {
    declare type KoaType = {
        middleware: Array<KoaMiddlewareType>
    }

    declare type KoaNextType = () => Promise

    declare type KoaContextType = {
        code: number;
        redirect: (url: string) => void;
        method: string;
        path: string;
        status: number;
    }

    declare type KoaMiddlewareType = (context: KoaContextType, next: KoaNextType) => Promise

    declare type KoaSendOptionsType = {
        index?: bool | string,
        root?: string,
        defer?: boolean
    };

    declare function exports(context: KoaContextType, path: string, opts: KoaSendOptionsType) : void;
}
