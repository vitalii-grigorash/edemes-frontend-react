import React from 'react';

function TablePagination() {

    return (
        <div className='table-pagination'>
            <div className='table-pagination__show-result-container'>
                <p className='table-pagination__show-result-text'>Показать: 10</p>
                <div className='table-pagination__show-result-icon' />
            </div>
            <p className='table-pagination__page'>1-8 из 8</p>
            <div className='table-pagination__page-change-container'>
                <div className='table-pagination__page-change-prev' />
                <div className='table-pagination__page-change-next' />
            </div>
        </div>
    );

}

export default TablePagination;