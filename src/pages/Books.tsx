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
      <div
        className={`flex items-center justify-center min-h-[400px] rounded-lg shadow-lg ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Error Loading Books
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Something went wrong while fetching the book collection.
          </p>
          <Button
            variant="default"
            className="mt-4 rounded-full px-6 py-2 font-semibold transition-all hover:scale-105"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10">
        <BookCopy
          className={`h-12 w-12 ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
          strokeWidth={1.75}
        />
        <h1
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Our Book Collection
        </h1>
        <p
          className={`text-sm sm:text-base text-center max-w-md ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore our curated selection of books across various genres.
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div
        className={`flex flex-wrap gap-4 items-center justify-center p-6 rounded-xl shadow-sm mb-8 mx-auto max-w-4xl ${
          theme === "dark"
            ? "bg-gray-800/80 border-gray-700"
            : "bg-white border-gray-200"
        } border transition-all duration-200`}
      >
        {/* Genre Filter */}
        <div className="flex flex-col gap-1 min-w-[180px]">
          <Label className="text-sm font-medium">Genre</Label>
          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger
              className={`w-full rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white"
              }`}
            >
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="FICTION">Fiction</SelectItem>
              <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="FANTASY">Fantasy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1 min-w-[180px]">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setPage(1);
            }}
          >
            <SelectTrigger
              className={`w-full rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white"
              }`}
            >
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-1 min-w-[120px]">
          <Label className="text-sm font-medium">Order</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => {
              setSortOrder(value);
              setPage(1);
            }}
          >
            <SelectTrigger
              className={`w-full rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white"
              }`}
            >
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Per Page */}
        <div className="flex flex-col gap-1 min-w-[100px]">
          <Label className="text-sm font-medium">Items Per Page</Label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger
              className={`w-full rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white"
              }`}
            >
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="28">28</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
          {Array.from({ length: limit }).map((_, i) => (
            <Card
              key={i}
              className={`${
                theme === "dark" ? "bg-gray-800/90" : "bg-white"
              } rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <CardHeader>
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 mt-2 rounded-md" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-4 w-full mt-4 rounded-md" />
                <Skeleton className="h-4 w-3/4 mt-2 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <BookCardView books={books} />
          <div className="flex items-center justify-center gap-4 mt-10 pb-12">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`rounded-full ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100"
              } shadow-sm transition-all duration-200 hover:scale-110`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Page {page} of {meta.totalPages} ({meta.total} books)
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={page >= meta.totalPages}
              className={`rounded-full ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-100"
              } shadow-sm transition-all duration-200 hover:scale-110`}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
