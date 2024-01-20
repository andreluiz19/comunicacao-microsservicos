const env = process.env;

export const MONGO_DB_URL = env.MONGO_DB_URL
    ? env.MONGO_DB_URL
    : "mongodb+srv://sales-db:admin@sales-db.5wfbmvl.mongodb.net/?retryWrites=true&w=majority";

export const API_SECRET = env.API_SECRET
    ? env.API_SECRET
    : "YXV0aC1hcGktc2VjcmV0LWRldi0xMjM0NTY=";

export const RABBIT_MQ_URL = env.RABBIT_MQ_URL
    ? env.RABBIT_MQ_URL
    : "amqps://gbooduwv:rV-fYlrJXMxD91Ax02MfbJD7SLiIEOfj@beaver.rmq.cloudamqp.com/gbooduwv";

export const PRODUCT_API_URL = env.PRODUCT_API_URL
    ? env.PRODUCT_API_URL
    : "http://localhost:8081/api/product";
