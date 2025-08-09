import { useDeleteBookMutation } from "@/redux/api/booksApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { IBookDeleteAlertDialogProps } from "@/types";
import { useTheme } from "@/hooks/useTheme";

const BookDeleteAlertDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  book,
}: IBookDeleteAlertDialogProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to delete book");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
        <AlertDialogHeader>
          <AlertDialogTitle className={theme === "dark" ? "text-gray-100" : ""}>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className={theme === "dark" ? "text-gray-300" : ""}>
            This action cannot be undone. This will permanently delete "
            {book?.title || ""}" from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={theme === "dark" ? "border-gray-600" : ""}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(book?._id || "")}
            className='bg-destructive text-white hover:bg-destructive/90'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookDeleteAlertDialog;