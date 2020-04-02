import React from 'react';


const OverlayBackdrop = props => (
        <div className="navbar-overlay-backdrop" style={{ "z-index": "90" }} onClick={() => { props.setActiveMenu('') }}>

        </div>

)


export default OverlayBackdrop;