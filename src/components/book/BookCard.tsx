import type { IBookCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { BookOpenIcon, InfoIcon, PenIcon, TrashIcon } from "lucide-react";
import BorrowModal from "../modals/BorrowModal";
import BookDeleteAlertDialog from "../modals/BookDeleteAlertDialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "@/hooks/useTheme";

const BookCard = ({ book, showDescription }: IBookCardProps) => {
  const { theme } = useTheme();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);

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
      <Card
        className={`flex flex-col h-full rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-800/90 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <CardHeader className="pb-4">
          <CardTitle
            className={`text-xl font-semibold tracking-tight line-clamp-2 ${
              theme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {book.title}
          </CardTitle>
          <div
            className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } line-clamp-1`}
          >
            by {book.author}
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Genre
              </span>
              <Badge
                variant="outline"
                className={`rounded-full px-3 py-1 ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-200"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {book.genre}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ISBN
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {book.isbn}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Copies
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {book.copies}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </span>
              <Badge
                variant={book.available ? "default" : "destructive"}
                className={`rounded-full px-3 py-1 ${
                  book.available
                    ? theme === "dark"
                      ? "bg-green-600/80 text-white"
                      : "bg-green-500 text-white"
                    : ""
                }`}
              >
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>

          {showDescription && book?.description && (
            <div className="pt-3">
              <p
                className={`text-sm leading-relaxed line-clamp-3 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {book.description}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-4">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className={`text-sm font-semibold ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            } hover:bg-transparent transition-all duration-200`}
          >
            <Link to={`/books/${book._id}`} className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              Details
            </Link>
          </Button>

          <div className="flex space-x-2">
            <Button
              asChild
              size="icon"
              variant="outline"
              className={`rounded-full h-9 w-9 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-all duration-200 hover:scale-105`}
              title="Edit"
            >
              <Link to={`/edit-book/${book._id}`}>
                <PenIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              onClick={() => handleBorrowModal()}
              size="icon"
              variant="outline"
              className={`rounded-full h-9 w-9 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-all duration-200 hover:scale-105`}
              title="Borrow"
            >
              <BookOpenIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleDeleteModal()}
              size="icon"
              variant="outline"
              className={`rounded-full h-9 w-9 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-all duration-200 hover:scale-105`}
              title="Delete"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <BookDeleteAlertDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        book={book}
      />

      <BorrowModal
        bookId={book?._id || ""}
        maxQuantity={book?.copies || 0}
        onOpenChange={setIsBorrowDialogOpen}
        open={isBorrowDialogOpen}
      />
    </>
  );
};

export default BookCard;
