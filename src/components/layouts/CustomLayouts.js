import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';

export const Hr = ({ width = '100px', color = '#f05f40', align = 'center' }) => (
    <hr align={align} style={{ maxWidth: width, borderWidth: '3px', borderColor: color }} />
)

export const Loader = ({ show = true, position = 'center' }) => {
    return (
        <Fragment>
            {
                show &&
                <div className={`d-flex justify-content-${position}`}>
                    <div className="loader">
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export const Pagination = ({ item, pageCount, handlePageClick, position = 'left', showPage = false, pageLoading }) => (
    <Fragment>
        {
            item.total > 0 && pageCount > 1 &&
            <Fragment>
                {
                    showPage &&
                    <p>Page</p>
                }
                <ReactPaginate
                    previousLabel={'‹'}
                    nextLabel={'›'}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    breakClassName={'break-me'}
                    forcePage={item.current_page - 1}
                    pageCount={pageCount}
                    onPageChange={(data) => handlePageClick(data)}
                    containerClassName={`pagination justify-content-${position} mt-3`}
                    subContainerClassName={'page-item'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    disableInitialCallback={true}
                />
                {
                    pageLoading &&
                    <Loader position={position} show={pageLoading} />
                }
            </Fragment>
        }
    </Fragment>
)