import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className=" max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json())

  return {
    props: {
      products
    }
  }
}


// Server-Side Rendering (SSR) in Next.js works by rendering React components on the server rather than in the client's browser.
// Here's a high-level overview of how SSR in Next.js works:

// 1. **User Request**:
//    When a user requests a page in a Next.js application, the request is first received by the server.

// 2. **Server-Side Data Fetching**:
//    Next.js allows you to define server-side data fetching methods such as `getServerSideProps`. These methods run on the server before the page is rendered and have access to server-side data sources like databases or APIs.

// 3. **Data Fetching**:
//    In the server-side data fetching methods, you can fetch data from external sources or databases. This data is often dynamic and can be different for each user or request.

// 4. **Rendering**:
//    Once the data fetching is complete, the server renders the page as HTML, including the data retrieved during data fetching. This rendered HTML is sent as the initial response to the client.

// 5. **Client Hydration**:
//    When the initial HTML is received by the client's browser, it also includes the JavaScript necessary for client-side rendering. The client-side JavaScript is responsible for "hydrating" the page. This means it takes over the page, attaching event listeners, making the page interactive, and updating it as necessary.

// 6. **Interactive Page**:
//    After hydration, the page becomes fully interactive, just like a Single-Page Application (SPA). The user can interact with the page, and further changes to the content or state are handled on the client side.

// Here are the key advantages of SSR in Next.js:

// - **Improved Performance**: SSR provides faster initial page loads because the server sends a fully rendered HTML page. This minimizes the "blank screen" effect that can occur with client-side rendering.

// - **SEO Optimization**: Search engines can easily index the content of SSR pages since the initial response is an HTML document with the page's content. This can improve search engine ranking.

// - **Better User Experience**: Users get to see content sooner, which can lead to a better user experience, especially on slower network connections.

// - **Dynamic Data**: SSR allows for dynamic data fetching, meaning the data displayed can vary from request to request based on user-specific information.

// It's important to choose the appropriate data-fetching method (e.g., `getServerSideProps`, `getStaticProps`) based on your use case and performance requirements. SSR is particularly useful for content that changes frequently or requires server-side data processing.



// getServerSideProps

// It is a function in Next.js that allows you to fetch data and perform server-side rendering for a page. It's used to pre-render a page on the server for each incoming request, which makes it suitable for pages with data that can change frequently or for cases where you need to fetch data dynamically based on user-specific information.

// Here's how getServerSideProps works:

// Data Fetching: Inside the getServerSideProps function, you can write server-side code to fetch data. This data can come from various sources, such as APIs, databases, or external services.

// Props: The data fetched in getServerSideProps is returned as props to the component associated with the page. These props are then available for use in your page component.

// Rendering: The page component is rendered on the server with the fetched data. This results in a fully rendered HTML page that is sent as the initial response to the client.

// Client Hydration: After the initial HTML is received by the client's browser, client-side JavaScript is loaded and takes over the page, making it fully interactive. The client-side JavaScript is responsible for "hydration" and handling further client-side rendering and interactions.

// getServerSideProps is a function in Next.js that allows you to fetch data and perform server-side rendering for a page. It's used to pre-render a page on the server for each incoming request, which makes it suitable for pages with data that can change frequently or for cases where you need to fetch data dynamically based on user-specific information.

// Here's how getServerSideProps works:

// Data Fetching: Inside the getServerSideProps function, you can write server-side code to fetch data. This data can come from various sources, such as APIs, databases, or external services.

// Props: The data fetched in getServerSideProps is returned as props to the component associated with the page. These props are then available for use in your page component.

// Rendering: The page component is rendered on the server with the fetched data. This results in a fully rendered HTML page that is sent as the initial response to the client.

// Client Hydration: After the initial HTML is received by the client's browser, client-side JavaScript is loaded and takes over the page, making it fully interactive. The client-side JavaScript is responsible for "hydration" and handling further client-side rendering and interactions.