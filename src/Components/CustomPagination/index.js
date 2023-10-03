import './style.css';

const CustomPagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];

    const handlePrevClick = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="paginationBar align-items-center">
        <p>Showing {itemsPerPage} out of {totalItems} Entries</p>
        <ul>
          <li><button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button></li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li> <button onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button></li>
        </ul>
      </div>
    );
  };
  
  export default CustomPagination;

