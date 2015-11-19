/*
    Contains techniques from koa-static.
    https://github.com/koajs/static
*/

import send from 'koa-send';
import path from "path";

export default function(root, opts) {
    opts = opts || {};
    opts.root = path.resolve(root);
    if (opts.index !== false) opts.index = opts.index || 'index.html';

    return async function(context, next) {
        if (opts.defer) {
            await next();
        }

        if (context.method !== 'HEAD' && context.method !== 'GET') return;

        // response is already handled
        if (context.body != null || context.status != 404) return;

        await send(context, context.path, opts);

        if (!opts.defer) {
            await next();
        }
    };
};
