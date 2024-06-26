import React from 'react';
import "./Source.css";

function Source() {
    return (
        <div className="mainDiv">
            <div className="btnDiv">
                <p>Pay Bill</p>
                <div className="buttons-container">
                    <div className="left-buttons">
                        <button type="button" className="button buy-airtime">Buy Airtime</button>
                        <button type="button" className="button buy-data">Buy Data</button>
                        <button type="button" className="button cable-tv">Cable TV (Dstv, Gotv, Startimes)</button>
                    </div>
                    <div className="right-buttons">
                        <button type="button" className="button buy-electricity">Buy Electricity</button>
                        <button type="button" className="button internet-subscription">Internet Subscription</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Source;
