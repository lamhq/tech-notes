### 1. Get stripe token

[https://stripe.com/docs/quickstart#collecting-payment-information](https://stripe.com/docs/quickstart#collecting-payment-information)

Email: a@m.mm (any)
Card no: 4242 4242 4242 4242
CVC: 333 (any)
Expiration date: 05/25
zip code: 12345
Token: tok_1CNZ882eZvKYlo2CgLTdjKiB


### 2. Saving customer id for later charges

Use stripe token created in step 1 to create customer object. Use customer id for subsequence charges.

```
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

(async function() {
  // Create a Customer:
  const customer = await stripe.customers.create({
    source: 'stripe_token',
    email: 'paying.user@example.com',
  });

  // Charge the Customer instead of the card:
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    customer: customer.id,
  });

  // YOUR CODE: Save the customer ID and other info in a database for later.
  saveCustomer(customer);
})();
```

Customer ID: cus_CnCHgkbotDTP3m


### 3. Creating a charge

```
(async function() {
  // When it's time to charge the customer again, retrieve the customer ID.
  const charge = stripe.charges.create({
    amount: 1500, // $15.00 this time
    currency: 'usd',
    customer: customer.id, // Previously stored, then retrieved
  });
})();
```

