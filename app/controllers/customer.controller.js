const db = require("../models");
const Customer = db.customer;

//Function to save new customer record in DB
exports.createCustomer = (req,res)=>{
    //req.body holds data sent from client
    let data = req.body;
    console.log(data);
    //Assigning body data to the customer object
    for(let p in data){
        customer[p] = data[p];
    }
    //Saving data in db
    customer.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            data:response,
            message:"New Customer created"
        })
    })
}

//Function to get all customers

exports.getAllCustomers = (req,res)=>{
    //'find' used to fetch data from DB
 Customer.find().sort("-createdOn").exec((err,customers)=>{
    if(err){
        return res.status(500).send({message:err})
    }
    res.send({
        data:customers
    })
 })   
}

//Function to Update the existing record
exports.updateCustomer = (req,res)=>{
 let data = req.body;
 //'updateOne' is used to update a single record whichever matches the filter (By Id)
 Customer.updateOne({_id:data.id},data,(err,response)=>{
    if(err){
        return res.status(500).send({message:err})
    }
    res.status(201).send({
        data:response,
        message:"Customer data updated"
    })
 })   
}

//Function to Delete the record
exports.deleteCustomer = (req,res)=>{
 //'updateOne' is used to delete a single record whichever matches the filter (By Id)
    Customer.deleteOne({_id:req.params.cid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            data:response,
            message:"Customer deleted"
        })
    })
}

//Function to get record by its id;
exports.getCustomerById = (req,res)=>{
    //'findById' is used to fetch record by it's id
    Customer.findById(req.params.cid,(err,customer)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(200).send({
            data:customer
        })
    })
}