import React from 'react'

export default function LastActionsTable({data}) {
    console.log('table data', data)
    const renderTableData = (tableData = []) => (
            tableData.map((tr, idx) => (
                <tr key={idx}>
                    <td>{tr.action}</td>
                    <td>{tr.id}</td>
                    <td>{tr.time}</td>
                </tr>
            ))
    )
    return (
        <table className='home-main_lastActionsTable'>
            <thead>
                <tr>
                    <th>Akcia</th>
                    <th>Uživateľ</th>
                    <th>Dátum a čas</th>
                </tr>
            </thead>
            <tbody>
                {renderTableData(data)}
            </tbody>
        </table>
    )
}
