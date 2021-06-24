const controller = require("../controllers/customer.controller");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post('/api/customers/createCustomer',controller.createCustomer);
    app.get('/api/customers/getAllCustomers',controller.getAllCustomers);
    app.get('/api/customers/getCustomerById/:cid',controller.getCustomerById);
    app.put('/api/customers/updateCustomer',controller.updateCustomer);
    app.delete('/api/customers/deleteCustomer/:cid',controller.deleteCustomer);
}
