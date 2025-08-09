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
      <div className={`container mx-auto p-4 max-w-4xl ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
        <div className={`rounded-lg border shadow-sm p-6 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <Skeleton className='h-8 w-1/3 mb-6' />
          <div className={`rounded-md border ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}>
            <Table>
              <TableHeader>
                <TableRow>
                  {["Title", "ISBN", "Quantity", "Actions"].map((label) => (
                    <TableHead key={label}>
                      <Skeleton className='h-4 w-24' />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className='h-4 w-full' />
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
      },
    });
    return (
      <div className={`container mx-auto p-4 max-w-4xl ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
        <div className={`rounded-lg border shadow-sm p-6 text-center ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200"
        }`}>
          <p className='mb-4'>Failed to load borrow summary</p>
          <Button 
            onClick={() => refetch()}
            className={theme === "dark" ? "bg-gray-700" : ""}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 max-w-4xl ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className={`rounded-lg border shadow-sm p-6 ${
        theme === "dark" 
          ? "bg-gray-800 border-gray-700 text-gray-100" 
          : "bg-white border-gray-200"
      }`}>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Borrow Summary</h1>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Label>Items:</Label>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className={`w-[100px] ${
                  theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                }`}>
                  <SelectValue placeholder='10' />
                </SelectTrigger>
                <SelectContent className={
                  theme === "dark" ? "bg-gray-800 border-gray-700" : ""
                }>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => refetch()} 
              variant='outline'
              className={theme === "dark" ? "border-gray-600" : ""}
            >
              Refresh
            </Button>
          </div>
        </div>

        {borrowsData.length === 0 ? (
          <div className='text-center py-12'>
            <BookOpenIcon className={`mx-auto h-12 w-12 mb-4 ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`} />
            <h3 className='text-lg font-medium'>No borrow records found</h3>
            <p className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              There are currently no books borrowed from the library.
            </p>
          </div>
        ) : (
          <>
            <BorrowSummaryTable BorrowsData={borrowsData} />
            <div className='flex items-center justify-between mt-6'>
              <div className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Showing {borrowsData.length} of {meta.total} records
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className={theme === "dark" ? "border-gray-600" : ""}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <span className={
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }>
                  Page {page} of {meta.totalPages}
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handleNextPage}
                  disabled={page >= meta.totalPages}
                  className={theme === "dark" ? "border-gray-600" : ""}
                >
                  <ChevronRight className='h-4 w-4' />
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