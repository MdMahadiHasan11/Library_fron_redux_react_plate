import type { UseFormReturn } from "react-hook-form";

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description?: string;
  image?: string;
  publishedYear?: number | undefined;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}

export interface IBorrow {
  _id?: string;
  book: string;
  quantity: number;
  dueDate: string;
  returned: boolean;
}

export interface IBorrowBook {
  bookId: string;
  title: string;
  isbn: string;
}

export interface IBorrowSummary {
  book: IBorrowBook;
  totalQuantity: number;
}

export interface IBorrowBookRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBookCardProps {
  book: IBook;
  showDescription?: boolean;
}

export interface IBookCardViewProps {
  books: IBook[];
  showDescription?: boolean;
}

export interface IBookFormProps {
  form: UseFormReturn<IBook>;
  onSubmit: (data: Omit<IBook, "id">) => void;
  isLoading: boolean;
}

export interface IBorrowSummaryTableProps {
  BorrowsData: IBorrowSummary[];
}

export interface IBookDeleteAlertDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
  book: IBook | undefined;
}

export interface IBorrowModalProps {
  bookId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maxQuantity: number;
}

export interface IBorrowFormData {
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface IBooksResponse {
  data: IBook[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
