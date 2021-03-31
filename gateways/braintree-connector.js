
const braintree = require("braintree");
const config = require("../config")
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: config.braintree.merchantId,
  publicKey: config.braintree.publicKey,
  privateKey: config.braintree.privateKey
});




module.exports.makePayment = function (options, callback) {
  gateway.transaction.sale(
    {
      "amount": options.amount,
	    "creditCard": options.creditCard
    }, (err, result) => {
      console.log("result:",result.success)

      if (result.success) {
        // See result.transaction for details
        console.log("Payment Successful")
        //   console.log(result.transaction);
        return callback(null,result)
      } else {
        // Handle errors
        console.log(result.message)
        callback(err || true, {message:result.message});
      }
    });
}