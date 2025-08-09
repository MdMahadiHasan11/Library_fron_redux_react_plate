import { useGetBooksQuery } from "@/redux/api/booksApi";
import BookCardView from "@/components/book/BookCardView";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookCopy, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";

const Books = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const { theme } = useTheme();

  const { data, isLoading, isError } = useGetBooksQuery({
    page,
    limit,
    sortBy,
    sort: sortOrder,
    ...(filter !== "all" && { filter }),
  });

  const books = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1 };

  const handlePreviousPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < meta.totalPages && setPage(page + 1);

  if (isError) {
    return (
      <div className={`flex items-center justify-center h-64 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}>
        <div className='text-center'>
          <h2 className='text-xl font-semibold'>Error loading books</h2>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${theme === "dark" ? "" : "bg-white"}`}>
      <div className='flex gap-4 items-center justify-center pt-8'>
        <BookCopy className='h-10 w-10' strokeWidth={1.5} />
        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}>
          Our Book Collection
        </h1>
      </div>

      {/* Filter and Sort Controls */}
      <div className={`flex flex-wrap gap-4 items-center justify-center p-4 rounded-lg mx-4 ${
        theme === "dark" 
          ? "bg-gray-800 border-gray-700" 
          : "bg-gray-50 border-gray-200"
      }`}>
        {/* Genre Filter */}
        <div className='flex items-center gap-2'>
          <Label>Genre:</Label>
          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value);
              setPage(1);
            }}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All Genres' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Genres</SelectItem>
              <SelectItem value='FICTION'>Fiction</SelectItem>
              <SelectItem value='NON_FICTION'>Non-Fiction</SelectItem>
              <SelectItem value='SCIENCE'>Science</SelectItem>
              <SelectItem value='FANTASY'>Fantasy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className='flex items-center gap-2'>
          <Label>Sort By:</Label>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setPage(1);
            }}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='createdAt'>Created Date</SelectItem>
              <SelectItem value='title'>Title</SelectItem>
              <SelectItem value='author'>Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className='flex items-center gap-2'>
          <Label>Order:</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => {
              setSortOrder(value);
              setPage(1);
            }}>
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Order' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='desc'>Descending</SelectItem>
              <SelectItem value='asc'>Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Per Page */}
        <div className='flex items-center gap-2'>
          <Label>Items:</Label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}>
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='12' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='4'>4</SelectItem>
              <SelectItem value='8'>8</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='12'>12</SelectItem>
              <SelectItem value='16'>16</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='28'>28</SelectItem>
              <SelectItem value='50'>50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className={theme === "dark" ? "bg-gray-800" : ""}>
              <CardHeader>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2 mt-2' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4 mt-2' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <BookCardView books={books} />
          <div className='flex items-center justify-center gap-4 mt-8 pb-8'>
            <Button
              variant='outline'
              size='icon'
              onClick={handlePreviousPage}
              disabled={page === 1}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Page {page} of {meta.totalPages}
            </span>
            <Button
              variant='outline'
              size='icon'
              onClick={handleNextPage}
              disabled={page >= meta.totalPages}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;