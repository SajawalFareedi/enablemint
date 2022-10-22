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

module.exports = {
    addNewCustomer,
    getCustomerByID,
    createCheckoutSession
};
