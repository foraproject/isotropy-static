import type { KoaContextType } from "koa";

declare module "koa-send" {
    declare type KoaSendOptionsType = {
        index?: bool | string,
        root?: string,
        defer?: boolean
    };

    declare function exports(context: KoaContextType, path: string, opts: KoaSendOptionsType) : void;
}
