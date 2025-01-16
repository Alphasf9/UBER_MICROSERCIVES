import amqp from 'amqplib';
const RABBITMQ_URL = 'amqps://rkjhnprg:yfYCh8DhQhm5VxpeBilxXclvEKSfq_ip@seal.lmq.cloudamqp.com/rkjhnprg';

let channel;

async function connectToRabbitMq() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('USER SERVICES ARE NOW CONNECTED TO RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
}

async function subscribeToQueue(queueName, callback) {
    if (!channel) {
        await connectToRabbitMq();
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            callback(msg.content.toString());
            channel.ack(msg);
        }
    });
}

async function publishToQueue(queueName, message) {
    if (!channel) {
        await connectToRabbitMq(); 
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message));
}


export {
    subscribeToQueue,
    publishToQueue,
    connectToRabbitMq
};
