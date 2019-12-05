import React from 'react'
import moment from 'moment'

export default function Footer() {
    return (

        <footer>
            <div className="text-center p-3 text-white">
                <h5>RenWorld Bank&trade; &copy; {moment().format('Y')}</h5>
                <small>Powered by Renmoney</small>
            </div>
        </footer>
    )
}
