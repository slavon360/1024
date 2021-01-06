import React from 'react';
import cx from 'classnames';

import variables from '../../variables.scss';
import './DynamicCell.scss';

console.log(variables);

const setColors = value => {
	switch (value) {
		case 2:
			return { color: '#776e65', backgroundColor: '#eee4da' };
		case 4:
			return { color: '#776e65', backgroundColor: '#ede0c8' };
		case 8:
			return { color: '#f9f6f2', backgroundColor: '#f2b179' };
		case 16:
			return { color: '#f9f6f2', backgroundColor: '#f59563' };
		case 32:
			return { color: '#f9f6f2', backgroundColor: '#f67c5f' };
		case 64:
			return { color: '#f9f6f2', backgroundColor: '#f65e3b' };
		case 128:
			return { color: '#f9f6f2', backgroundColor: '#edcf72' };
		case 256:
			return {
				color: '#f9f6f2',
				backgroundColor: '#edcc61',
				boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)'
			};
		default:
			return { color: '#776e65', backgroundColor: '#eee4da' };
	}
}

const setPositions = (rowNumber, colNumber) => {
	return {
		left: Math.floor(121.25 * (colNumber - 1)),
		top: Math.floor(121.25 * (rowNumber - 1))
	}
}

const DynamicCell = ({
	value,
	rowNumber,
	colNumber,
	isNew
}) => {
	const colorStyles = setColors(value);
	const positionsStyles = setPositions(rowNumber, colNumber);

	return (
		<div className={cx('dynamic-cell-component', { 'new-dynamic-cell': isNew })} style={{...colorStyles, ...positionsStyles}}>{value}</div>
	)
};

export default DynamicCell;