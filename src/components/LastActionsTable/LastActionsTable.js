import React from 'react'

export default function LastActionsTable() {
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
                <tr>
                    <td>Otvorenie okna č. 1</td>
                    <td>richard.rusnak@student.tuke.sk</td>
                    <td>4.4.2020 14:32</td>
                </tr>
                <tr>
                    <td>Zavretie okna č. 1</td>
                    <td>richard.rusnak@student.tuke.sk</td>
                    <td>4.4.2019 15:09</td>
                </tr>
                <tr>
                    <td>Zapnutie klímy</td>
                    <td>richard.rusnak@student.tuke.sk</td>
                    <td>4.4.2020 15:12</td>
                </tr>
                <tr>
                    <td>Vypnutie klímy</td>
                    <td>test@test.com</td>
                    <td>4.4.2020 15:50</td>
                </tr>
            </tbody>
        </table>
    )
}
