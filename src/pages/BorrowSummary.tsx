import { useGetBorrowSummaryQuery } from "@/redux/api/borrowsApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpenIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { IBorrowSummary } from "@/types";
import BorrowSummaryTable from "@/components/book/borrow/BorrowSummaryTable";
import { useTheme } from "@/hooks/useTheme";

const BorrowSummary = () => {
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, refetch } = useGetBorrowSummaryQuery({
    page,
    limit,
  });

  const borrowsData: IBorrowSummary[] = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1 };

  const handlePreviousPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < meta.totalPages && setPage(page + 1);

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
          <Skeleton className="h-10 w-1/3 mb-6 rounded-md" />
          <div
            className={`rounded-lg border ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  {["Title", "ISBN", "Quantity", "Actions"].map((label) => (
                    <TableHead key={label}>
                      <Skeleton className="h-5 w-24 rounded-md" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load borrow summary", {
      style: {
        background: theme === "dark" ? "#020817" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        borderRadius: "8px",
        padding: "12px",
      },
    });
    return (
      <div
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
          theme === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        <div
          className={`rounded-xl border shadow-md p-8 text-center ${
            theme === "dark"
              ? "bg-gray-800/90 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Failed to Load Borrow Summary
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Something went wrong while fetching the borrow records.
          </p>
          <Button
            onClick={() => refetch()}
            className={`rounded-full px-6 py-2 font-semibold ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-all duration-200 hover:scale-105`}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div
        className={`rounded-xl border shadow-md p-8 ${
          theme === "dark"
            ? "bg-gray-800/90 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        } transition-all duration-200`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <BookOpenIcon
              className={`h-10 w-10 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
              strokeWidth={1.75}
            />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Borrow Summary
              </h1>
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                View and manage your borrowed books
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 min-w-[120px]">
              <Label className="text-sm font-medium">Items Per Page</Label>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className={`rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent
                  className={`rounded-lg ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                  }`}
                >
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className={`rounded-full px-4 py-2 font-semibold ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-all duration-200 hover:scale-105`}
            >
              Refresh
            </Button>
          </div>
        </div>

        {borrowsData.length === 0 ? (
          <div className="text-center py-16">
            <BookOpenIcon
              className={`mx-auto h-16 w-16 mb-4 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <h3 className="text-xl font-semibold tracking-tight">
              No Borrow Records Found
            </h3>
            <p
              className={`text-sm mt-2 max-w-md mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              There are currently no books borrowed from the library. Start
              borrowing to see records here.
            </p>
          </div>
        ) : (
          <>
            <BorrowSummaryTable BorrowsData={borrowsData} />
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <div
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Showing {borrowsData.length} of {meta.total} records
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className={`rounded-full ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  } transition-all duration-200 hover:scale-110`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Page {page} of {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={page >= meta.totalPages}
                  className={`rounded-full ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  } transition-all duration-200 hover:scale-110`}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
