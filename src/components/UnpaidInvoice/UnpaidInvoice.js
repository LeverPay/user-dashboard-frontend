import React from 'react'
import UnpaidData from '../../TestData/UnpaidData';
import Table from "react-bootstrap/Table";

import './UnpaidInvoice.css'

function UnpaidInvoice(props) {

    return (
            <table  className='Unpaiddata' >
                <tbody>
                    <tr key={props.id} className='table-data'>
                        <td>{props.name}</td>
                        <td>{props.type}</td>
                        <td>{props.amt}</td>
                        <td>{props.status}</td>
                        <td>{props.date}</td>
                    </tr>
                </tbody>
            </table>
        // </div>
    )
}

export default UnpaidInvoice