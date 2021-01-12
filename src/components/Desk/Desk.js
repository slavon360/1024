import React from 'react';

import StaticCell from '../StaticCell/StaticCell';
import DynamicCell from '../DynamicCell/DynamicCell';

import './Desk.scss';

const DeskComponent = ({ dynamicCells, staticCells, rowAndColumnsMaxNumber, gameOver }) => {
	return (
		<div className="desk-component-wrapper">
			<div className="static-cells">
				{gameOver &&
					<div className="game-over">
						<p>Game over!</p>
						<div className="lower">
							<a className="retry-button">Try again</a>
						</div>
					</div>
				}
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
							key={`${cell.rowNumber}-${cell.colNumber}-${index}`}
							rowNumber={cell.rowNumber}
							colNumber={cell.colNumber}
							prevRowNumber={cell.prevRowNumber}
							prevColNumber={cell.prevColNumber}
							value={cell.value}
							isNew={cell.isNew}
							toRemove={cell.toRemove}
							merged={cell.merged}
						/>))}
				</div>
			</div>
		</div>
	)
}

export default DeskComponent;
