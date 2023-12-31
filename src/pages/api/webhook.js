// refer to stripe webhook documentation https://stripe.com/docs/payments/handling-payment-events

import { buffer } from 'micro';
import * as admin from 'firebase-admin'

//secure a connection to FIREBASE from the backend

const serviceAccount = require('../../../firebasePermissions.json')
//check wether the firebaseApp is already initialised otherwise initialise it
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

//establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fulfillOrder = async (session) => {
    console.log('fulfilling order', session);
    return app.firestore().collection("users").doc(session.metadata.email)
        .collection("orders").doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
        })
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();

        //access the stripe signature from the HTTP headers sent with the request whcih will be used to verify the authenticity
        const sig = req.headers["stripe-signature"];

        let event;

        //verify that EVENT posted came from Stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log("ERROR in webhook", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //handle the checkout.session.completed event which gets fired on checkout session is completed
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook error: ${err.message}`))
            //will fulfill the order (means put it inside the database)
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}



//buffer
// It is used to read the request data from an HTTP request.
// Specifically, the buffer function is used to read the raw request data from the incoming HTTP request body.
// In the context of web applications, when a client (such as a browser or a mobile app) makes an HTTP POST request,
// it can include data in the request body. This data can be in various formats, such as JSON, form data, or even binary data.
// The buffer function is used to read this raw request body data as a binary buffer,
// which can then be processed or converted into the appropriate format, such as a string or JSON object,
// depending on the content type of the request. This allows you to handle and process the data sent by the client in the request.


// stripe.webhooks.constructEvent
// The constructEvent method is provided by the Stripe library,
// and it's used to verify the authenticity and integrity of the incoming webhook event. It takes three arguments:
// payload: The raw payload of the webhook request.
// sig: The value of the "stripe-signature" header from the request, which contains a cryptographic signature.
// endpointSecret: The secret used to sign the webhook events on the server.

// The purpose of this code is to ensure the security and authenticity of incoming webhook events from Stripe. Stripe signs the
// webhook events with a secret, and this code checks whether the signature provided in the request (sig) matches the signature generated by Stripe.
// if the verification fails, the method throws an error, which triggers the catch block.
// this is how the event variable might look like
// event = {
//     id: 'evt_1234567890',
//     type: 'charge.succeeded',
//     data: {
//       object: {
//         id: 'ch_1234567890',
//         amount: 1000,  // Amount in cents
//         customer: 'cus_1234567890',
//         // Other charge details
//       }
//     },
//     // Metadata and other event-related properties
//   }



// The `config` object exported in your code is used to configure how a specific Next.js API route behaves. It customizes the behavior of this particular API route.
// Let's break down what each property in the `config` object does:

// `api`: This is an object that configures the behavior of the Next.js API route.
// `bodyParser: false`: This property specifies whether the route should automatically parse the request body. When `bodyParser` is set to `false`,
//  it means that the request body won't be automatically parsed, and you need to handle the request body yourself if needed, such as using the `buffer` method
//  as you did in your code to manually parse the request data.
// `externalResolver: true`: When `externalResolver` is set to `true`, it indicates that the route should be resolved externally. This means that the route should
//  be handled outside of the default Next.js request handler. In your case, it allows you to handle the request and response manually.

// By setting `bodyParser` to `false` and `externalResolver` to `true`, you have configured this specific API route to perform manual handling of the request body and
//  response, giving you more control over the processing of the incoming request.

// This customization is useful when you have specific requirements for how your API route should behave, such as in the case of handling webhooks, where you want to
//  validate and process the request data manually, as you did in your code.