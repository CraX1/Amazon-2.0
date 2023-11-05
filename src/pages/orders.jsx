import React from "react";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import moment from "moment/moment";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import Order from "../components/Order";

const orders = ({ orders }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders.map((order) => (
            <Order key={order.id} orderDetails={order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default orders;
//to load the orders we will do server side render means before it hits the page it hits the server and there itself we will pre-render the order using nextjs capability

//note- everthing under getServerSideProps is nodejs
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //get the user logged in creds
  const session = await getSession(context); //on servers side we use getSession and not useSession
  if (!session) {
    return {
      props: {},
    };
  }

  const usersCollectionRef = collection(db, "users"); // Reference to the 'users' collection
  const userDocRef = doc(usersCollectionRef, session.user.email); // Reference to the specific user document
  const ordersCollectionRef = collection(userDocRef, "orders"); // Reference to the 'orders' subcollection

  const ordersQuery = query(ordersCollectionRef, orderBy("timestamp", "desc"));

  const stripeOrders = await getDocs(ordersQuery);
  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      //so over firebase the timestamps is in a particular format so we should convert it into unix format using moment library
      timestamp: moment(order.data().timestamp.toDate()).unix(),

      //   https://stripe.com/docs/api/checkout/sessions/line_items
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}

// The provided code segment is responsible for fetching a user's orders from a Firebase Firestore database and processing them. Here's a breakdown of each step:

// 1. **Collection and Document References**:
//    - `usersCollectionRef`: This line defines a reference to the "users" collection within the Firestore database. It's a top-level collection where user data is typically stored.

//    - `userDocRef`: It creates a reference to a specific user document within the "users" collection. The document is identified using the user's email, which is presumably unique and serves as the document's unique identifier.

//    - `ordersCollectionRef`: This line defines a reference to the "orders" subcollection within the user's document. Subcollections are a way to structure data within Firestore. In this case, it is likely that each user document has a subcollection for their orders.

// 2. **Query and Sorting**:
//    - `ordersQuery`: It constructs a query for the "orders" subcollection. The query includes an `orderBy` clause to sort the orders by the "timestamp" field in descending order ("desc"). This means the orders will be sorted with the most recent orders appearing first in the result.

// 3. **Fetching Firestore Data**:
//    - `stripeOrders`: This variable fetches the data from Firestore using the previously defined `ordersQuery` by calling `getDocs`. It retrieves a snapshot of the documents in the "orders" subcollection for the specific user.

// 4. **Processing Data**:
//    - The code uses `await` and `Promise.all` to process the data obtained from Firestore.
//    - It iterates through each order document in `stripeOrders.docs` using `map`. For each order document, it extracts and formats relevant data and stores it in an object.
//    - The extracted data includes the order's unique identifier (`id`), the order amount (`amount`), the amount for shipping (`amountShipping`), images associated with the order (`images`), and the timestamp.
//    - The timestamp is processed using the "moment" library. It converts the Firestore timestamp data to a Unix timestamp for easier handling.
//    - Additionally, it appears to make a call to the Stripe API using `stripe.checkout.sessions.listLineItems` to retrieve the items associated with each order, and the result is stored under the "items" property in the order object.

// The result is an array of order objects, where each object represents a user's order with all the relevant details. This array is stored in the `orders` variable and is likely intended to be passed as a prop to a React component for rendering and display on the front end of the application.
