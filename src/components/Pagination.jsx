import { func, number } from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ initialPage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      activeClassName='pagination-active'
      breakClassName='pagination-break'
      containerClassName='pagination-container'
      initialPage={initialPage}
      marginPagesDisplayed={2}
      nextClassName='pagination-next-prev'
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      pageClassName='pagination-page'
      previousClassName='pagination-next-prev'
    />
  );
};

Pagination.propTypes = {
  initialPage: number.isRequired,
  pageCount: number.isRequired,
  onPageChange: func.isRequired,
};

export default Pagination;
