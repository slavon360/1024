import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import variables from '../../variables.module.scss';
import './DynamicCell.scss';

const { cellMarginBottom, cellMarginRight, cellWidthHeight } = variables;

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
		case 512:
			return {
				color: '#f9f6f2',
				backgroundColor: '#edc850',
				boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)'
			};
		case 1024:
			return {
				color: '#f9f6f2',
				backgroundColor: '#edc53f',
				boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)',
				fontSize: '35px'
			};
		default:
			return { color: '#776e65', backgroundColor: '#eee4da' };
	}
}

const setPositions = (rowNumber, colNumber) => {
	return {
		left: Math.floor((parseFloat(cellWidthHeight) + parseFloat(cellMarginRight)) * (colNumber - 1)),
		top: Math.floor((parseFloat(cellWidthHeight) + parseFloat(cellMarginBottom)) * (rowNumber - 1))
	}
}

const DynamicCell = ({
	value,
	rowNumber,
	colNumber,
	prevRowNumber,
	prevColNumber,
	isNew,
	toRemove,
	merged
}) => {
	const colorStyles = setColors(value);
	const prevPositionsStyles = setPositions(prevRowNumber, prevColNumber);
	const [currentStyles, setCurrentStyles] = useState({ zIndex: toRemove ? -1 : 11 });

	useEffect(() => {
		let unmounted = false;

		if (!unmounted) {
			window.setTimeout(() => {
				const currentPositions = setPositions(rowNumber, colNumber);

				setCurrentStyles({ ...currentStyles, ...currentPositions });
			}, 50);
		}

		return () => { unmounted = true };
	}, []);

	useEffect(() => {
		setCurrentStyles({ ...currentStyles, zIndex: toRemove ? -1 : 10 });
	}, [toRemove]);

	return (
		<div className={cx('dynamic-cell-component', {
			'new-dynamic-cell': isNew,
			'dynamic-cell-merged': merged
		})} style={{
			...colorStyles,
			...prevPositionsStyles,
			...currentStyles
		}}>{value}</div>
	)
};

export default DynamicCell;