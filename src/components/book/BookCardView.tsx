import type { IBookCardViewProps } from "@/types";
import BookCard from "./BookCard";
import { useTheme } from "@/hooks/useTheme";

const BookCardView = ({ books }: IBookCardViewProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${
      theme === "dark" ? "" : "bg-white"
    }`}>
      {books?.map((book, index) => (
        <BookCard key={index + 1} book={book} />
      ))}
    </div>
  );
};

export default BookCardView;