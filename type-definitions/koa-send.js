type SendOptionsType = { index?: bool | string, root?: string, defer?: bool };

declare module "koa-send" {
    declare function exports(context: ContextType, path: string, opts: SendOptionsType) : void;
}
