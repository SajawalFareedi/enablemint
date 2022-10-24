const stripe = require("stripe").Stripe;
const STRIPE_SECRET_KEY = process.env.STRIPE_API_KEY;
const Stripe = new stripe(STRIPE_SECRET_KEY);


const addNewCustomer = async (email) => {
    const customer = await Stripe.customers.create({
        email,
        description: "New Customer",
    });

    return customer;
};

const getCustomerByID = async (id) => {
    const customer = await Stripe.customers.retrieve(id);
    return customer;
};

const createCheckoutSession = async (customer, price) => {
    const session = await Stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer,
        line_items: [
            {
                price,
                quantity: 1
            }
        ],
        subscription_data: {
            trial_period_days: 7
        },

        success_url: ``,
        cancel_url: ``
    })

    return session
}

async function attachCardToCustomer(cardToken, customerId) {
    return await Stripe.customers.createSource(customerId, {source: cardToken})
}

async function createPaymentMethod(data) {
    const splitDate = data.cardDate.split('/')
    return await Stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: data.cardNumber,
        exp_month: splitDate[0],
        exp_year: splitDate[1],
        cvc: data.cvc,
      },
    });
}

async function attachPaymentMethodToCustomer(paymentMethodId, customerId, setAsDefault=true) {

    const paymentMethod = await Stripe.paymentMethods.attach(
      paymentMethodId,
      {customer: customerId}
    );

    if (setAsDefault) {
        await updateCustomer(customerId, {invoice_settings: {default_payment_method: paymentMethodId}})
    }
    return paymentMethod
}

async function updateCustomer(customerId, data) {
    return await Stripe.customers.update(customerId, data);
}

async function subscribeCustomerToPlan(customerId, priceId='price_1LubUOGsrQPkkKAHcw8u109Y') {
    return await Stripe.subscriptions.create({
        customer: customerId,
        items: [
            {price: priceId},
        ]
    })
}

module.exports = {
    addNewCustomer,
    getCustomerByID,
    createCheckoutSession,
    attachCardToCustomer,
    createPaymentMethod,
    attachPaymentMethodToCustomer,
    subscribeCustomerToPlan
};
