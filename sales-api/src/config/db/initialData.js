import { v4 as uuid4 } from "uuid";

import Order from "../../modules/sales/model/Order.js";

export async function createInitialData() {
    await Order.collection.drop();
    await Order.create({
        products: [
            {
                productId: 1000,
                quantity: 3,
            },
            {
                productId: 1001,
                quantity: 2,
            },
            {
                productId: 1001,
                quantity: 1,
            },
        ],
        user: {
            id: "dsa1d8sa4d8g48ad1dsa8d4",
            name: "User Test",
            email: "usertest@gmail.com",
        },
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
        transactionid: uuid4(),
        serviceid: uuid4(),
    });
    await Order.create({
        products: [
            {
                productId: 1000,
                quantity: 2,
            },
            {
                productId: 1002,
                quantity: 3,
            },
        ],
        user: {
            id: "dasnj10dnsa01e31dnsa9",
            name: "User Test 2",
            email: "usertest2@gmail.com",
        },
        status: "REJECTED",
        createdAt: new Date(),
        updatedAt: new Date(),
        transactionid: uuid4(),
        serviceid: uuid4(),
    });
    let initialData = await Order.find();
    console.info(
        `Initial data was created: ${JSON.stringify(initialData, undefined, 4)}`
    );
}
