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
      {
        path: "/u/profile",
        element: <ProfileSettingsPage />,
      },
      // getuserprofile
      // getusers
      // getOwnListings
      {
        path: "/u/listings",
        element: <UserListingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
);
