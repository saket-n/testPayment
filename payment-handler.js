var braintreeConnector = require("./gateways/braintree-connector");
// import any other payment gateway connectors here

module.exports.makePayment = function(options,callback){

    // check payment gateway preference

    //check AMEX card
    if(isAmex(options.creditCard.number)){
        if(options.currency!=="USD")
            return callback({code:400},{message:"AMEX can be used only for USD"})
        
            //paypal error or support
        return callback({code:500},{message:"Paypal not yet supported"})

    }
    switch(options.currency){
        case "USD":
        case "EUR":
        case "AUD":
            //paypal error
            return callback({code:500},{message:"Paypal not yet supported"})
            break;
        default:
            braintreeConnector.makePayment(options,callback)
    }


}

function isAmex(number){
    return  /^3[47][0-9]{5,}$/.test(number)

}

module.exports.isAmex=isAmex