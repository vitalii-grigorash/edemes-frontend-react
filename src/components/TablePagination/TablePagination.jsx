import React, { useState, useEffect } from 'react';

function TablePagination(props) {

    const {
        sortList,
        handleShowResultsFrom,
        handleResultsShow
    } = props;

    const [isShowSortOptions, setShowSortOptions] = useState(false);
    const [isChoiceContainerActive, setChoiceContainerActive] = useState(false);
    const [resultsShow, setResultsShow] = useState(10);
    const [result, setResult] = useState(10);
    const [selectedResultsShow, setSelectedResultsShow] = useState(10);
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [allPages, setAllPages] = useState(0);

    useEffect(() => {
        const pages = sortList.length / selectedResultsShow
        setAllPages(Math.ceil(pages));
    }, [sortList.length, selectedResultsShow]);

    useEffect(() => {
        sortList.map((list) => {
            if (list.id) {
                return setShowSortOptions(true);
            } else {
                return setShowSortOptions(false);
            }
        })
    }, [sortList]);

    function showPrevResults() {
        if (resultsShow <= result) {
            return
        } else {
            setShowResultsFrom(showResultsFrom - result);
            handleShowResultsFrom(showResultsFrom - result);
            setResultsShow(resultsShow - result);
            handleResultsShow(resultsShow - result);
            setPageCount(pageCount - 1);
        }
    }

    function showNextResults() {
        if (resultsShow >= sortList.length) {
            return
        } else {
            setShowResultsFrom(0 + resultsShow);
            handleShowResultsFrom(0 + resultsShow);
            setResultsShow(result + resultsShow);
            handleResultsShow(result + resultsShow);
            setPageCount(pageCount + 1);
        }
    }

    function handleShowChoiceContainer() {
        if (isChoiceContainerActive) {
            setChoiceContainerActive(false);
        } else {
            setChoiceContainerActive(true);
        }
    }

    function onChoiceClick(value) {
        setResultsShow(value);
        handleResultsShow(value);
        setResult(value);
        setSelectedResultsShow(value);
        setShowResultsFrom(0);
        handleShowResultsFrom(0);
        setPageCount(1);
    }

    return (
        <div className='table-pagination'>
            {isShowSortOptions && (
                <>
                    <div className='table-pagination__show-result-container' onClick={handleShowChoiceContainer}>
                        <p className='table-pagination__show-result-text'>Показать: {selectedResultsShow}</p>
                        <div className='table-pagination__show-result-icon' />
                        {isChoiceContainerActive && (
                            <div className="table-pagination__show-result-choice-container">
                                <div className="table-pagination__show-result-choice" onClick={() => onChoiceClick(10)}>
                                    <p className="table-pagination__show-result-choice-value">10</p>
                                </div>
                                <div className="table-pagination__show-result-choice" onClick={() => onChoiceClick(50)}>
                                    <p className="table-pagination__show-result-choice-value">50</p>
                                </div>
                                <div className="table-pagination__show-result-choice" onClick={() => onChoiceClick(100)}>
                                    <p className="table-pagination__show-result-choice-value">100</p>
                                </div>
                                <div className="table-pagination__show-result-choice" onClick={() => onChoiceClick(500)}>
                                    <p className="table-pagination__show-result-choice-value">500</p>
                                </div>
                                <div className="table-pagination__show-result-choice" onClick={() => onChoiceClick(1000)}>
                                    <p className="table-pagination__show-result-choice-value">1000</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className='table-pagination__page'>{pageCount} из {allPages}</p>
                    <div className='table-pagination__page-change-container'>
                        <div className='table-pagination__page-change-prev' onClick={showPrevResults} />
                        <div className='table-pagination__page-change-next' onClick={showNextResults} />
                    </div>
                </>
            )}
        </div>
    );

}

export default TablePagination;