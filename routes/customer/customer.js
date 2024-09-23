const {
  basicData,
  fullCustomersData,
  fullCust1,
  fullCust2,
  fullCust3,
  staffData,
} = require("./customerData.js");
async function Customer(fastify, options) {
  fastify.get("/customer-data", async (request, reply) => {
    reply.send(basicData);
  }),

  fastify.get("/particular-emi-data/:id", async (request, reply) => {
      const customerId = request.params.id;
      for await (const element of fullCustomersData) {
        if (element._id === customerId) {
          reply.send(element);
          break;
        }
      }
    });


  // --------------Post routes----------------------------------------------------


    fastify.post("/notification/:staffId", async (request, reply) => {
      const staffId = request.params.staffId;
      const { date } = request.body;
      const notifications = [];
      
      if (!date || isNaN(new Date(date))) {
        return reply.code(400).send("Invalid date provided");
      }
    
      for await (const element of basicData) {
        if (element.staffId === staffId) {
          const assignedDate = new Date(element.assignedDate);
          const requestDate = new Date(date);
          
          if (assignedDate <= requestDate) {
            notifications.push(element);
          } else {
            return reply.send("No data is available!");
          }
        }
      }
      
      if (notifications.length > 0) {
        return reply.send(notifications);
      } else {
        return reply.send("No data is assigned to you!");
      }
    });

    fastify.post("/update-payment-date/:id", async (request, reply) => {
      const customerId = request.params.id;
      const { paymentDate } = request.body;

      if (!paymentDate || isNaN(new Date(paymentDate))) {
        return reply.code(400).send("Invalid date provided");
      }
    
      for await (const element of fullCustomersData) {
        if (element._id === customerId) {
          const requestDate = new Date(paymentDate);
          element.paymentDate = requestDate;
          reply.send(element);
        }
      }
    });
    

  // --------------login----------------------------------------------------

  fastify.post("/login", async (request, reply) => {
    const { number, password } = request.body;

    for await (const element of staffData) {
      if (element.number == number && element.password == password) {
        reply.send(element)
      }else{
        reply.send("Number Or Password is wrong!");
      }
    }
  });
}

module.exports = Customer;
