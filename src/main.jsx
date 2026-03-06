import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import ProfileSettingsPage from "./pages/ProfileSettingsPage.jsx";
import UserListingsPage from "./pages/UserListingsPage.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ListingFormPage from "./pages/ListingFormPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // test search page
      {
        path: "/test",
        element: <SearchPage />,
      },

      // Home / Landing
      {
        index: true,
        element: <LandingPage />,
      },
      // About Us
      {
        path: "/about-us",
        element: <AboutPage />,
      },
      // Search / Results
      {
        path: "/search",
        element: <SearchPage />,
      },
      // TODO : Check if same URL and Page can be used for both - Login and Signup
      // login
      {
        path: "/auth",
        element: <AuthPage />,
      },
      // signup
      {
        path: "/auth",
        element: <AuthPage />,
      },
      // createlisting
      // getlistings

      // getspecificlisting
      {
        path: "/listing/:id",
        element: <PropertyDetailPage />,
      },
      // profile settings

      // getuserprofile
      // getusers
      // getOwnListings
      {
        path: "/u",
        element: <DashboardLayout />,
        children: [
          {
            path: "profile",
            element: <ProfileSettingsPage />,
          },
          {
            path: "listings",
            element: <UserListingsPage />,
          },
          {
            path: "listings/new",
            element: <ListingFormPage />,
          },
          {
            path: "listings/:id",
            element: <ListingFormPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>,
);
