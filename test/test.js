

var assert = require('assert');


var paymentsHandler = require("../payment-handler")
var braintreeConnector = require("../gateways/braintree-connector")

describe('Payment', function () {
    describe('#checkAMEX', function () {

        it('should return true when the number starts with 34', function () {
            assert.equal(paymentsHandler.isAmex(3454684654654), true);
        });
        it('should return true when the number starts with 37', function () {
            assert.equal(paymentsHandler.isAmex(3745465434654), true);
        });
        it('should return false when the number starts with 35', function () {
            assert.equal(paymentsHandler.isAmex(3545465434654), false);
        });
        it('should return false when the number starts with anything other than 34 and 37', function () {
            assert.equal(paymentsHandler.isAmex(4245454351435), false);
        });

    });


    describe("#Braintree", function (done2) {

        it('should return success for valid payment details', function (done) {
            this.timeout(15000);
            braintreeConnector.makePayment({
                "amount": (Math.floor(Math.random() * 1000) + 1), // so that transaction is not duplicate after running the test again
                "creditCard": {
                    "number": "4111111111111111",
                    "expirationMonth": "2",
                    "expirationYear": "2022",
                    "cvv": "111"
                }
            },function(err,result){
                assert.equal(result.success,true)
                done()
                console.log("done")
            })
        })

        it('should return transaction id in string', function (done) {
            this.timeout(15000);
            braintreeConnector.makePayment({
                "amount": (Math.floor(Math.random() * 1000) + 1), // so that transaction is not duplicate after running the test again
                "creditCard": {
                    "number": "4111111111111111",
                    "expirationMonth": "2",
                    "expirationYear": "2022",
                    "cvv": "111"
                }
            },function(err,result){
                assert.ok(typeof result.transaction.id === "string")
                done()
                console.log("done")
            })
        })

        it('should return failure for invalid payment details', function (done) {
            this.timeout(15000);
            braintreeConnector.makePayment({
                "amount": (Math.floor(Math.random() * 1000) + 1), // so that transaction is not duplicate after running the test again
                "creditCard": {
                    "number": "4111111111111111",
                    "expirationMonth": "2",
                    "cvv": "111"
                }
            },function(err,result){
                assert.equal(result.success,undefined)
                done()
                console.log("done")
            })
        })
    });

});