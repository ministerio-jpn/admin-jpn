import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    // Crie um array de números de 1 a totalPages para representar as páginas
    const pages = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className="max-w-2xl mx-auto">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <button
                                onClick={() =>{currentPage !== 0 && onPageChange(currentPage-1)}}
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3"
                        >
                            {'<'}
                        </button>
                    </li>
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                className={`${page === currentPage
                                    ? 'bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
                                    : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    } leading-tight py-2 px-3`}
                                onClick={() => onPageChange(page)}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3"
                            onClick={() => { currentPage + 1 < totalPages && onPageChange(currentPage+1)}}
                            >
                            {'>'}

                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
