import React, { useState, useEffect, useCallback } from 'react';

import Desk from './components/Desk/Desk';
import Card from './components/Card/Card';
import './app-styles.scss';

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
	const cells = [...Array(dynamicCellsNumber).keys()].map(() => {
		const rowNumber = getRandomInt(rowAndColumnsMaxNumber, nums);
		const colNumber = getRandomInt(rowAndColumnsMaxNumber, nums);

		return {
			value: 2,
			rowNumber,
			colNumber,
			prevRowNumber: rowNumber,
			prevColNumber: colNumber,
			isNew: false,
			merged: false
		}
	});

	return cells;
};

const App = () => {
	let currentScore = 0;
	const staticCells = initStaticCells(cellsQuantity);
	const [dynamicCells, setDynamicCells] = useState(() => initDynamicCells(cellsQuantity));
	const [scores, setScore] = useState({ prevScore: 0, currentScore: 0, addedAmount: 0 });

	const addNewRandomCell = cells => {
		const rowNumber = Math.ceil(Math.random() * Math.floor(rowAndColumnsMaxNumber));
		const colNumber = Math.ceil(Math.random() * Math.floor(rowAndColumnsMaxNumber));
		const newCell = {
			value: currentScore && !(currentScore % 50) ? 4 : 2,
			rowNumber,
			colNumber,
			prevRowNumber: rowNumber,
			prevColNumber: colNumber,
			isNew: true,
			merged: false
		};
	
		const notConvenient = cells.find(cell => cell.rowNumber === newCell.rowNumber && cell.colNumber === newCell.colNumber);
	
		if (!notConvenient) {
			return [...cells, newCell];
		} else {
			return addNewRandomCell(cells);
		}
	}

	const changeCellsPosition = (direction, cells) => {
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

	const directionsHandler = (direction, cells, vertical) => {
		let updatedCells = [];
		const coord = vertical ? 'rowNumber' : 'colNumber';
		const rearrangeCells = (cells, numberToBegin) => {
			return cells.map((cell, index) => ({
				...cell,
				[coord]: direction === UP || direction === LEFT ?
				!cell.toRemove ? numberToBegin++ : cells[index-1][coord] :
				!cell.toRemove ? numberToBegin-- : cells[index-1][coord]
			}));
		}
	
		[...Array(rowAndColumnsMaxNumber).keys()].forEach(number => {
			const filteredByColOrRow = cells.filter(cell => vertical ? cell.colNumber === (number + 1) : cell.rowNumber === (number + 1));
			let sortedCells = filteredByColOrRow.sort((a, b) => parseInt(a[coord]) - parseInt(b[coord]));
			sortedCells = sortedCells.filter(cell => !cell.toRemove);
			sortedCells = direction === UP || direction === LEFT ? sortedCells : sortedCells.reverse();
			let numberToBegin = direction === UP || direction === LEFT ? 1 : rowAndColumnsMaxNumber;
	
			sortedCells = checkForSameValues(sortedCells);
			sortedCells = rearrangeCells(sortedCells, numberToBegin);
			updatedCells = [ ...updatedCells, ...sortedCells ];
		});
	
		updatedCells = isSameCells(cells, updatedCells) ? cells : addNewRandomCell(updatedCells);

		return updatedCells;
	};
	const removeNewFlag = cell => ({
		...cell,
		isNew: false
	});
	const removeMergedFlag = cell => ({
		...cell,
		merged: false
	});
	const setPreviousCoordinates = cell => ({
		...cell,
		prevRowNumber: cell.rowNumber,
		prevColNumber: cell.colNumber
	});
	const checkForSameValues = cells => {
		return cells.map((cell, index) => {
			const nextCell = cells[index + 1];

			cell = setPreviousCoordinates(cell);
			cell = removeNewFlag(cell);
			cell = removeMergedFlag(cell);
	
			if (nextCell && nextCell.value === cell.value) {
				const value = cell.value * 2;
				nextCell.toRemove = !cell.toRemove;

				currentScore += value;

				return { ...cell, value, merged: true };
			} else {
				return cell;
			}
		});
	};

	const handleUserKeyPress = useCallback(event => {
		setDynamicCells(prevCells => changeCellsPosition(event.keyCode, prevCells));
		setScore(prevScores => {
			
			return { prevScore: prevScores.currentScore,  addedAmount: currentScore - prevScores.currentScore, currentScore };
		});
	}, []);

	// useEffect(() => {
	// 	console.log('score: ', score, 'currentScore: ', currentScore);
	// }, [score, currentScore]);

	useEffect(() => {
		window.addEventListener('keydown', handleUserKeyPress);

		return () => {
			window.removeEventListener('keydown', handleUserKeyPress);
		};
	}, [handleUserKeyPress]);	

	return (
		<div className="App">
			<Card score={scores.currentScore} addedAmount={scores.addedAmount}/>
			<Desk
				staticCells={staticCells}
				dynamicCells={dynamicCells}
				rowAndColumnsMaxNumber={rowAndColumnsMaxNumber}
			/>
		</div>
	);
}

export default App;
