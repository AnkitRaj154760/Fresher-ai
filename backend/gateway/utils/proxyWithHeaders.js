import proxy from "express-http-proxy";

export const proxyWithHeaders = (serviceUrl) => {
    return proxy(
        serviceUrl,
        {
            proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
                if (srcReq.user) {
                    proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
                    if (srcReq.user.email) {
                        proxyReqOpts.headers["x-user-email"] = srcReq.user.email;
                    }
                }

                // If express.json() parsed the body, ensure content headers match the serialized payload
                if (srcReq.body && Object.keys(srcReq.body).length > 0 && !srcReq.is("multipart/form-data")) {
                    proxyReqOpts.headers["Content-Type"] = "application/json";
                    proxyReqOpts.headers["Content-Length"] = Buffer.byteLength(JSON.stringify(srcReq.body));
                }

                return proxyReqOpts;
            },
            proxyReqBodyDecorator: (bodyContent, srcReq) => {
                // If the request was JSON-parsed by express.json(), re-serialize it so downstream services receive it
                if (srcReq.body && Object.keys(srcReq.body).length > 0 && !srcReq.is("multipart/form-data")) {
                    return JSON.stringify(srcReq.body);
                }
                return bodyContent;
            }
        }
    );
};
