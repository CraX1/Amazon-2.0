# Installation Steps



## Using npm

Run commands

1) ```npm install```


2) ```npm run dev```


## Or using yarn

Run commands 

1) ```npm install --global yarn```

2) ```yarn install```

3) ```yarn run dev```


### If you see the window below then you are set to build AMAZON 2.0!

![Template Screenshot](TemplateScreenshot.jpg?raw=true "Template Screenshot")

Now since we are using Next Auth and using google as provider we will be-
1) Setting up firebase project for this and use the config in the firebase.js
2) To use google authentication we can get the Google_id and Secret_key from the Autthentication section of Firebase
3) on seing the invalid uri requesr go to the link in the error and go to credentials page of google cloud and under OAuth 2.0 Client IDs section
click on the web client link (https://console.cloud.google.com/apis/credentials/oauthclient/616940739802-3i5bj6cs8kqpurg31lleoqv1hqinjus6.apps.googleusercontent.com?project=amzn-2-clone-48587) and there first add URI http://localhost:3000 and in authorised add the http://localhost:3000/api/auth/callback/google
4) Now after signin to get the signed in authentication state wrap the _app.js with the Provider of next-auth/client


<!-- stripe -->
Now what stripe does is when we click checkout and we have items in the basket then we pass the items from our basket to stripe
Stripe then return a checkout session and then we redirect our user to that session and then the user fills out the card details and address and all 
then it can either succeed or fail and we can decide what we want to do or we get redirected back to the page itself

Steps to integrate stripe to the project
1. yarn add stripe
2. also add @strip/stripe-js to use the loadStripe function, purpose of this stripePromise is to ensure that the Stripe JavaScript library is loaded and initialized outside of a component's render. This is important because you don't want to recreate the Stripe object on every render of your component. Instead, you create the Stripe object once and then use it throughout your application for processing payments.
In summary, this code sets up a promise (stripePromise) that loads the Stripe client-side JavaScript library with your Publishable Key. This library is essential for handling payments and other Stripe-related functionality in your Next.js application. It follows best practices by loading the Stripe library outside of the component render to avoid unnecessary re-initialization.
3. add role="link" property to the checkout button
4. Create a stripe account amazon2.0-clone and go to developers section and get the api key and secret keys
5. Paste those keys in your env.local
6. you can add that key in the next.config file and remember doing it only for the public key
7. Create a checkout_session file under your api folder to fetch server details and basically backend work
9. use axios to make network api calls