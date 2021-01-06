import React, { useState, useEffect, useCallback } from 'react';

import Desk from './components/Desk/Desk';
import './App.scss';

const cellsQuantity = 16;
const rowAndColumnsMaxNumber = Math.sqrt(16);
const UP = 'up';
const DOWN = 'down';
const RIGHT = 'right';
const LEFT = 'left';
const getRandomInt = (max, nums) => {
	const number = Math.ceil(Math.random() * Math.floor(max));

	if (nums.includes(number)) {
		return getRandomInt(max, nums);
	}
	nums.push(number);

	return number;
};
const initStaticCells = quantity => [...Array(quantity).keys()];
const initDynamicCells = (quantity, dynamicCellsNumber = 2) => {
	const rowAndColumnsMaxNumber = Math.sqrt(quantity);
	const nums = [];
	const cells = [...Array(dynamicCellsNumber).keys()].map(() => ({
		value: 2,
		rowNumber: getRandomInt(rowAndColumnsMaxNumber, nums),
		colNumber: getRandomInt(rowAndColumnsMaxNumber, nums),
		isNew: false
	}));

	return cells;
};
const addNewRandomCell = cells => {
	const newCell = {
		value: 2,
		rowNumber: Math.ceil(Math.random() * Math.floor(rowAndColumnsMaxNumber)),
		colNumber: Math.ceil(Math.random() * Math.floor(rowAndColumnsMaxNumber)),
		isNew: true
	};

	const notConvenient = cells.find(cell => cell.rowNumber === newCell.rowNumber && cell.colNumber === newCell.colNumber);

	if (!notConvenient) {
		return [...cells, newCell];
	} else {
		return addNewRandomCell(cells);
	}
}

const App = () => {
	const staticCells = initStaticCells(cellsQuantity);
	const [dynamicCells, setDynamicCells] = useState(() => initDynamicCells(cellsQuantity));
	// const [previousDirection, setPreviousDirection] = useState(null);
	// const [allowNextMove, setAllowNextMove] = useState(true);

	const changeCellsPosition = (direction, cells) => {
		console.log(direction);
		switch (direction) {
			case 38:
				return directionsHandler(UP, cells, true);
			case 40:
				return directionsHandler(DOWN, cells, true);
			case 39:
				return directionsHandler(RIGHT, cells);
			case 37:
				return directionsHandler(LEFT, cells);
			default:
				return cells;
		}
	};
	const isSameCells = (prevCell, currentCell) => {
		let isSame = true;
		
		prevCell.forEach(cell => {
			const same = currentCell.find(currCell => {
				return currCell.value === cell.value && currCell.colNumber === cell.colNumber && currCell.rowNumber === cell.rowNumber;
			});

			if (!same) {
				isSame = false;
			}
		});

		return isSame;
	}
	// const recalculateHandler = (callback, previousData, direction) => {
	// 	if ((allowNextMove && direction === previousDirection) || direction !== previousDirection) {
	// 		return callback.apply(null, [direction,previousData]);
	// 	} else {
	// 		return previousData;
	// 	}
	// }
	const directionsHandler = (direction, cells, vertical) => {
		// setAllowNextMove(false);
		let updatedCells = [];
		const coord = vertical ? 'rowNumber' : 'colNumber';
		const rearrangeCells = (cells, numberToBegin) => {
			return cells.map(cell => ({
				...cell,
				[coord]: direction === UP || direction === LEFT ? numberToBegin++ : numberToBegin--
			}));
		}
	
		[...Array(rowAndColumnsMaxNumber).keys()].forEach(number => {
			const filteredByColOrRow = cells.filter(cell => vertical ? cell.colNumber === (number + 1) : cell.rowNumber === (number + 1));
			let sortedCells = filteredByColOrRow.sort((a, b) => parseInt(a[coord]) - parseInt(b[coord]));
			sortedCells = direction === UP || direction === LEFT ? sortedCells : sortedCells.reverse();
			let numberToBegin = direction === UP || direction === LEFT ? 1 : rowAndColumnsMaxNumber;
	
			sortedCells = checkForSameValues(sortedCells);
			sortedCells = sortedCells.filter(cell => !cell.toRemove);
			sortedCells = rearrangeCells(sortedCells, numberToBegin);
			updatedCells = [ ...updatedCells, ...sortedCells ];
		});
	
		updatedCells = isSameCells(cells, updatedCells) ? cells : addNewRandomCell(updatedCells);
		// setPreviousDirection(direction);

		return updatedCells;
	};
	const removeNewFlag = cell => ({
		...cell,
		isNew: false
	});
	const checkForSameValues = cells => {
		return cells.map((cell, index) => {
			const nextCell = cells[index + 1];

			cell = removeNewFlag(cell);
	
			if (nextCell && nextCell.value === cell.value) {
				nextCell.toRemove = true;
				// setAllowNextMove(true);
				return { ...cell, value: cell.value * 2 };
			} else {
				return cell;
			}
		});
	};

	const handleUserKeyPress = useCallback(event => {
		setDynamicCells(prevCells => changeCellsPosition(event.keyCode, prevCells));
	}, []);

	useEffect(() => {
		console.log('use effect: ', dynamicCells);
	}, [dynamicCells]);

	useEffect(() => {
		window.addEventListener('keydown', handleUserKeyPress);

		return () => {
			window.removeEventListener('keydown', handleUserKeyPress);
		};
	}, [handleUserKeyPress]);	

	return (
		<div className="App">
			<Desk
				staticCells={staticCells}
				dynamicCells={dynamicCells}
				rowAndColumnsMaxNumber={rowAndColumnsMaxNumber}
			/>
		</div>
	);
}

export default App;
