const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  const body = JSON.parse(event.body);

  try {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "EZY Market Order"
            },
            unit_amount: body.amount * 100
          },
          quantity: 1
        }
      ],

      mode: "payment",

      success_url: "https://ezy-market.com.au?success=true",
      cancel_url: "https://ezy-market.com.au?cancel=true"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }

};
