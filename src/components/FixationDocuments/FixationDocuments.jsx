import React, { useState } from "react";
import FixationDocumentsData from '../../utils/FixationDocumentsData.json';
import TablePagination from '../TablePagination/TablePagination';

function FixationDocuments() {

    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(10);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    return (
        <div className='fixation-documents'>
            <div className='fixation-documents__rows fixation-documents__rows_heading'>
                <p className='fixation-documents__document'>Документ</p>
                <p className='fixation-documents__date'>Дата составления</p>
                <p className='fixation-documents__shipper'>Грузоотправитель</p>
                <p className='fixation-documents__consignee'>Грузополучатель</p>
                <p className='fixation-documents__cargoCode'>Код груза</p>
                <p className='fixation-documents__price'>Стоимость</p>
            </div>
            {FixationDocumentsData !== null ? (
                <>
                    {FixationDocumentsData.slice(showResultsFrom, resultsShow).map((list) => (
                        <div key={list.id} className='fixation-documents__rows'>
                            <p className='fixation-documents__document'>{list.document}</p>
                            <p className='fixation-documents__date'>{list.date}</p>
                            <p className='fixation-documents__shipper'>{list.shipper}</p>
                            <p className='fixation-documents__consignee'>{list.consignee}</p>
                            <p className='fixation-documents__cargoCode'>{list.cargoCode}</p>
                            <p className='fixation-documents__price'>{list.price}</p>
                        </div>
                    ))}
                </>
            ) : (
                <div className='fixation-documents__rows'>
                    <p className='fixation-documents__no-results-text'>Нет данных для отображения</p>
                </div>
            )}
            <TablePagination
                sortList={FixationDocumentsData}
                handleShowResultsFrom={handleShowResultsFrom}
                handleResultsShow={handleResultsShow}
            />
        </div>
    );
}

export default FixationDocuments;
