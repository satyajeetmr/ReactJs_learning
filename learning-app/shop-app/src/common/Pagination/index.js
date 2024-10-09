import React from 'react';

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    const paginationNumbers = [];
    // console.log('postsPerPage', postsPerPage);
    // console.log('length---pa', paginationNumbers);

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {paginationNumbers.map((pageNumber) => (
                <li className={` ${currentPage === pageNumber ? "active" : undefined} page-item`} key={pageNumber}><button key={pageNumber} className="page-link" onClick={(e) => handlePagination(pageNumber)}>{pageNumber}</button></li>
            ))}
        </ul>
    );
};
export default Pagination;