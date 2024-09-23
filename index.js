const fastify = require("fastify")({ logger: true });
const formbody = require('@fastify/formbody');
fastify.register(formbody);

fastify.register(require("./routes/customer/index"));


const start = async () => {
  try {
    await fastify.listen({host: '0.0.0.0', port: 8182 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
