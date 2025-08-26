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
    <div
      className={`rounded-lg border shadow-sm max-w-4xl mx-auto ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Borrow Summary
        </h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow
            className={`${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-700 text-gray-200"
                : "bg-gray-50 hover:bg-gray-50 text-gray-900"
            }`}
          >
            <TableHead className="text-sm font-semibold">Book Title</TableHead>
            <TableHead className="text-sm font-semibold">ISBN</TableHead>
            <TableHead className="text-sm font-semibold">
              Total Borrowed
            </TableHead>
            <TableHead className="text-sm font-semibold text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BorrowsData?.map((item: IBorrowSummary) => (
            <TableRow
              key={item?.book?.bookId}
              className={`transition-colors duration-200 ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-gray-200"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <TableCell className="font-medium text-sm py-3">
                {item?.book?.title}
              </TableCell>
              <TableCell className="text-sm py-3">{item?.book?.isbn}</TableCell>
              <TableCell className="text-sm py-3">
                {item?.totalQuantity}
              </TableCell>
              <TableCell className="text-right py-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={`rounded-md transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-200 hover:bg-gray-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Link
                    to={`/books/${item?.book?.bookId}`}
                    className="flex items-center gap-2"
                  >
                    <BookOpenIcon className="h-4 w-4" />
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
