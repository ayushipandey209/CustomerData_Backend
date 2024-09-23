
async function customerRoutes(fastify, options) {
    fastify.register(require("./customer.js"));
}
module.exports = customerRoutes;