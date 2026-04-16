import css from "../App/App.module.css";
interface PaginationProp {
  pageCount: number;
  totalPages: number;
  onChange: (page: number) => void;
}
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPagination = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function ReactPaginate({
  totalPages,
  onChange,
  pageCount,
}: PaginationProp) {
  return (
    <>
      <ReactPagination
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onChange(selected + 1)}
        forcePage={pageCount - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}
