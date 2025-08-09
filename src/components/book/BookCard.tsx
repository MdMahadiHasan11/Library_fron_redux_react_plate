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
        "This Book is not available for borrowing! Borrow another one."
      );
    }
    setIsDeleteDialogOpen(false);
    setIsBorrowDialogOpen(true);
  };

  return (
    <>
      <Card className={`flex flex-col h-full hover:shadow-lg transition-shadow ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}>
        <CardHeader>
          <CardTitle className={`text-lg truncate ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
            {book.title}
          </CardTitle>
          <div className={`text-sm truncate ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {book.author}
          </div>
        </CardHeader>

        <CardContent className='flex-grow'>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='font-medium'>Genre:</span>
              <Badge variant='outline'>{book.genre}</Badge>
            </div>

            <div className='flex justify-between'>
              <span className='font-medium'>ISBN:</span>
              <span className='text-sm'>{book.isbn}</span>
            </div>

            <div className='flex justify-between'>
              <span className='font-medium'>Copies:</span>
              <span className='text-sm'>{book.copies}</span>
            </div>

            <div className='flex justify-between'>
              <span className='font-medium'>Status:</span>
              <Badge variant={book.available ? "default" : "destructive"}>
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </div>

            {showDescription && book?.description && (
              <div className='pt-2'>
                <p className='text-sm line-clamp-3 text-muted-foreground'>
                  {book.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <Button asChild size='sm' variant='ghost'>
            <Link to={`/books/${book._id}`} className='flex items-center gap-1'>
              <InfoIcon className='h-4 w-4' />
              <span>Details</span>
            </Link>
          </Button>

          <div className='flex space-x-1'>
            <Button asChild size='icon' variant='outline' className='h-8 w-8'>
              <Link to={`/edit-book/${book._id}`} title='Edit'>
                <PenIcon className='h-3 w-3' />
              </Link>
            </Button>
            <Button
              onClick={() => handleBorrowModal()}
              size='icon'
              variant='outline'
              className='h-8 w-8'
              title='Borrow'>
              <BookOpenIcon className='h-3 w-3' />
            </Button>
            <Button
              onClick={() => handleDeleteModal()}
              size='icon'
              variant='outline'
              className='h-8 w-8'
              title='Delete'>
              <TrashIcon className='h-3 w-3' />
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