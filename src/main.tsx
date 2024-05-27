import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Classrooms from "./pages/classrooms/Classrooms.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import ErrorPage from "./pages/404/404.tsx";
import Subjects from "./pages/subjects/Subjects.tsx";
import Settings from "./pages/settings/Settings.tsx";
import Users from "./pages/users/Users.tsx";
import Profile from "./pages/profile/Profile.tsx";
import AxiosInterceptor from "./services/axiosInterceptors.ts";
import Classroom from "./pages/classrooms/Classroom.tsx";
import AddUser from "./pages/users/AddUser.tsx";
import UserDetails from "./pages/users/UserDetails.tsx";
import AddClassroom from "./pages/classrooms/AddClassroom.tsx";
import { Provider } from 'react-redux';
import { store } from "./redux/store.ts";

AxiosInterceptor();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },

      {
        path: "classrooms",
        children: [
          {
            path: "",
            element: <Classrooms />,
          },
          {
            path: ":id",
            element: <Classroom />,
          },
          {
            path: "add",
            element: <AddClassroom />,
          },
        ],
      },

      {
        path: "subjects",
        element:<Subjects />,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <Users />,
          },
          {
            path: ":id",
            element: <UserDetails />,
            children: [
              {
                path: ":edit",
                element: <UserDetails />,
              },
            ],
          },
          {
            path: "add",
            element: <AddUser />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        children: [
          {
            path: ":username",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
