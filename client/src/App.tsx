import { Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/profile";
import { QueryClient, QueryClientProvider } from "react-query";
import ListingInfo from "./pages/listingInfo";
import Reservations from "./pages/reservations";
import Listings from "./pages/listings";
import Wishlists from "./pages/wishlists";
import SearchResults from "./pages/searchResults";


function App() {
  const queryClient = new QueryClient();

 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <Layout>
          <Navbar />
        </Layout>
        <div className={  ` top-[12vh]  pb-[12vh] md:pb-10 relative   overflow-y-scroll`}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/account" element={<Profile  />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/wishlists" element={<Wishlists  />} />
              <Route path="/search" element={<SearchResults  />} />
              <Route
                path="/listings/:id"
                element={<ListingInfo  />}
              />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </Layout>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
