import express from "express";

import { connectMongoDb } from "./src/config/db/mongoDbConfig.js";
import { createInitialData } from "./src/config/db/initialData.js";
import { connectRabbitMq } from "./src/config/rabbitmq/rabbitConfig.js";
import { sendProductStockUpdateToQueue } from "./src/modules/product/rabbitmq/productStockUpdateSender.js";
import orderRoutes from "./src/modules/sales/routes/OrderRoutes.js";
import checkToken from "./src/config/auth/checkToken.js";
import tracing from "./src/config/tracing.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDb();
createInitialData();
connectRabbitMq();

app.use(express.json());

app.get("/api/status", async (req, res) => {
    return res.status(200).json({
        service: "Sales-API",
        status: "up",
        httpStatus: 200,
    });
});

app.get("/test", (req, res) => {
    try {
        sendProductStockUpdateToQueue([
            {
                productId: 1001,
                quantity: 3,
            },
            {
                productId: 1002,
                quantity: 2,
            },
            {
                productId: 1003,
                quantity: 1,
            },
        ]);
        return res.status(200).json({ status: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true });
    }
});

app.use(tracing);
app.use(checkToken);
app.use(orderRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}.`);
});
