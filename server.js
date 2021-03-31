const config = require("./config")
var dbHandler = require("./db-handler")
var path = require('path'); 
var express = require("express");

var app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public'))); 

const paymentHandler = require("./payment-handler")

// redirect to http://localhost:3001
app.get('/' , (req , res) => {
    res.redirect('/index.html'); 
})

app.post('/payment', function (req, res) {

    if(!req.body.orderDetails){
        return res.status(400).send({error:"Order Details missing"})
    }
    
    if(!req.body.paymentDetails){
        return res.status(400).send({error:"Payment Details missing"})
    }

    paymentHandler.makePayment(req.body.paymentDetails,function(err,result){
        if(err){
            if(err.code){
                res.status(err.code).send(result)
            }else{
                res.status(500).send(result);
            }
        }else{
            // save to db
            dbHandler.insertOrder({orderDetails:req.body.orderDetails,paymentDetails:req.body.paymentDetails,transaction:result.transaction},function(){
                res.json({transactionId:result.transaction.id});
            })
        }
    });
});

app.listen(config.PORT || 3050);
console.log('Express Server started on port:',(config.PORT || 3050));