import css from "../App/App.module.css";
interface PaginationProp {
  forcePage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
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
  forcePage,
  onPageChange,
  pageCount,
}: PaginationProp) {
  return (
    <>
      <ReactPagination
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={forcePage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}
