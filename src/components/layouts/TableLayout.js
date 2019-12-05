import $ from 'jquery';
import React from 'react';
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');

export default function TableLayout({ columns, children, loading = false, onlyTable = false }) {
    return (
        <div className="table-responsive">
            <table className={`table table-bordered nowrap ${loading && 'hidden'}`} ref={(ref) => setTableRef(ref, loading, onlyTable)} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

const setTableRef = (ref, loading, onlyTable) => {
    if (loading) {
        $(ref).dataTable().fnDestroy()
    }
    if (!$.fn.DataTable.isDataTable(ref) && !loading) {
        $(ref).dataTable({
            dom: onlyTable ? 't' : 'lfBrtipHF',
            buttons: [
                'excel', 'pdf', 'print'
            ],
        })
    }
}