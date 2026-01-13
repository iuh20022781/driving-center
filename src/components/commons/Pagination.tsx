import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
export default function PaginationNumberless() {
  return (
    <div className="w-full max-w-xs">
      <Pagination className="w-full ">
        <PaginationContent className="w-full justify-end">
          <PaginationItem>
            <span className="text-[#184363] mr-2 text-sm">Trang 1</span>
          </PaginationItem>
          <PaginationItem className="p-2 rounded-lg border border-gray-300 mr-2">
            <ChevronsLeft className="h-4 w-4" />
          </PaginationItem>
          <PaginationItem className="p-2 rounded-lg border border-gray-300">
            <ChevronsRight className="h-4 w-4" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
