# payment-gateway
 
This is a test to integrate Braintree PayPal API with Node JS.
Currently Test possible with POSTMAN.
Still Work in progress on the UI side.
But Backend works fine.

TO RUN :

1) Install NPM : npm install
2) Run Server  : node server
3) Run Tests   : npm test
4) Use the API with following request structure:

{
  "orderDetails":{
         "item" : "Coffee"
  },
  "paymentDetails":{
         "amount" : "100",
         "currency" : "USD",
         "creditCard":{
               "number" : 1234567890123456,
               "expirationMonth": "2",
               "expirationYear":  "2021",
               "cvv": "007"
         }
  }
}
