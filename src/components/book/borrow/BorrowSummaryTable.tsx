import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import { BookOpenIcon } from "lucide-react";
import type { IBorrowSummary, IBorrowSummaryTableProps } from "@/types";
import { useTheme } from "@/hooks/useTheme";

const BorrowSummaryTable = ({ BorrowsData }: IBorrowSummaryTableProps) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-md border ${
      theme === "dark" ? "border-gray-700" : "border-gray-200"
    }`}>
      <Table>
        <TableHeader>
          <TableRow className={
            theme === "dark" ? "bg-gray-700 hover:bg-gray-700" : ""
          }>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BorrowsData?.map((item: IBorrowSummary) => (
            <TableRow key={item?.book?.bookId} className={
              theme === "dark" ? "hover:bg-gray-700" : ""
            }>
              <TableCell className='font-medium'>{item?.book?.title}</TableCell>
              <TableCell>{item?.book?.isbn}</TableCell>
              <TableCell>{item?.totalQuantity}</TableCell>
              <TableCell className='text-right'>
                <Button 
                  asChild 
                  variant='outline' 
                  size='sm'
                  className={theme === "dark" ? "border-gray-600" : ""}
                >
                  <Link to={`/books/${item?.book?.bookId}`}>
                    <BookOpenIcon className='h-4 w-4 mr-2' />
                    View Book
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummaryTable;