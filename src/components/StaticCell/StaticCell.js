import React, { useState } from 'react';

import './StaticCell.scss';

const StaticCell = ({ styles = {} }) => {
    return (
        <div style={{...styles}} className="cell-component-wrapper"></div>
    )
}

export default StaticCell;