import React from 'react';

import StaticCell from '../StaticCell/StaticCell';
import DynamicCell from '../DynamicCell/DynamicCell';

import './Desk.scss';

const DeskComponent = ({ dynamicCells, staticCells, rowAndColumnsMaxNumber }) => {
	return (
		<div className="desk-component-wrapper">
			<div className="static-cells">
				<div className="cells-container">
					{staticCells.map(cell_index => {
						let styles = (cell_index + 1) % rowAndColumnsMaxNumber === 0 ? { marginRight: 0 } : {};

						styles = staticCells.length - (cell_index + 1) < rowAndColumnsMaxNumber ? {
							...styles,
							marginBottom: 0
						} : styles;

						return <StaticCell key={cell_index} styles={styles}/>
					})}
					{dynamicCells.map((cell, index) => (
						<DynamicCell
							key={cell.rowNumber + '-' + index}
							rowNumber={cell.rowNumber}
							colNumber={cell.colNumber}
							value={cell.value}
							isNew={cell.isNew}
						/>))}
				</div>
			</div>
		</div>
	)
}

export default DeskComponent;
