import Main from "@/layouts/Main";
import Books from "@/pages/Books";
import CreateBook from "@/pages/CreateBook";
import { createBrowserRouter } from "react-router";
import BorrowSummary from "@/pages/BorrowSummary";
import BookDetailsPage from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
      // Add a catch-all route for 404 errors
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
