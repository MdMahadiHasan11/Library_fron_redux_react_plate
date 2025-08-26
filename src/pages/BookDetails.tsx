import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookOpenIcon, PenIcon, TrashIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import BookDeleteAlertDialog from "@/components/modals/BookDeleteAlertDialog";
import BorrowModal from "@/components/modals/BorrowModal";
import toast from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";

const BookDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { data, isLoading } = useGetBookByIdQuery(id || "");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

  const book = data?.data || {};

  if (isLoading) {
    return (
      <div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
          theme === "dark" ? "bg-gray-950" : "bg-gray-50"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-xl border shadow-md p-8 ${
            theme === "dark"
              ? "bg-gray-800/90 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
          <Skeleton className="h-6 w-1/2 mb-8 rounded-md" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
          </div>

          <Skeleton className="h-5 w-1/4 mb-3 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 mt-3 rounded-md" />
        </div>
      </div>
    );
  }

  if (!book)
    return (
      <div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Book Not Found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The book you are looking for does not exist or has been removed.
          </p>
          <Button asChild variant="default" className="rounded-full px-6 py-2">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );

  const handleDeleteModal = () => {
    setIsBorrowDialogOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleBorrowModal = () => {
    if (book.copies === 0 || !book.available) {
      return toast.error(
        "This book is not available for borrowing! Try another one.",
        {
          style: {
            background: theme === "dark" ? "#020817" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            borderRadius: "8px",
            padding: "12px",
          },
        }
      );
    }
    setIsDeleteDialogOpen(false);
    setIsBorrowDialogOpen(true);
  };

  return (
    <>
      <div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
          theme === "dark" ? "bg-gray-950" : "bg-gray-50"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-xl border shadow-md overflow-hidden ${
            theme === "dark"
              ? "bg-gray-800/90 border-gray-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-900"
          } transition-all duration-200`}
        >
          <div className="md:flex">
            {/* Book Cover Image Section */}
            <div
              className={`md:w-1/3 p-8 flex items-center justify-center ${
                theme === "dark" ? "bg-gray-700/80" : "bg-gray-50"
              } transition-colors duration-200`}
            >
              {book.image ? (
                <img
                  src={book?.image}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/default-book-cover.jpg";
                  }}
                />
              ) : (
                <div
                  className={`w-full h-72 flex items-center justify-center rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <BookOpenIcon className="h-20 w-20" />
                </div>
              )}
            </div>

            {/* Book Details Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                    {book.title}
                  </h1>
                  <h2
                    className={`text-lg font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    by {book.author}
                  </h2>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={`rounded-full ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  } transition-all duration-200 hover:scale-105`}
                >
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="flex items-center gap-2"
                  >
                    <PenIcon className="h-4 w-4" />
                    Edit Book
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { label: "Genre", value: book.genre },
                  { label: "ISBN", value: book.isbn },
                  {
                    label: "Publication Year",
                    value: book.publishedYear || "N/A",
                  },
                  {
                    label: "Availability",
                    value: book.available
                      ? `Available (${book.copies} copies)`
                      : "Not Available",
                    className: book.available
                      ? "text-green-500"
                      : "text-red-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </div>
                    <div
                      className={`text-base font-semibold ${
                        item.className ||
                        (theme === "dark" ? "text-gray-200" : "text-gray-700")
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {book.description && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </div>
                  <p
                    className={`text-base leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {book.description}
                  </p>
                </div>
              )}

              <div className="mt-10 flex gap-3">
                <Button
                  onClick={() => handleBorrowModal()}
                  className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } transition-all duration-200 hover:scale-105`}
                  disabled={book.copies === 0 || !book.available}
                >
                  <BookOpenIcon className="h-5 w-5" />
                  Borrow Book
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteModal()}
                  className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold transition-all duration-200 hover:scale-105`}
                >
                  <TrashIcon className="h-5 w-5" />
                  Delete Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <BookDeleteAlertDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        book={book}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      {/* Borrow Modal */}
      <BorrowModal
        bookId={book?._id || ""}
        maxQuantity={book?.copies || 0}
        onOpenChange={setIsBorrowDialogOpen}
        open={isBorrowDialogOpen}
      />
    </>
  );
};

export default BookDetails;
