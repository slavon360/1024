import React, { useEffect, useRef } from 'react';
import cx from 'classnames';

import './Card.scss';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
	  ref.current = value;
	});
	console.log(value);
	return ref.current;
}

const Card = ({score, addedAmount, prevScore}) => {
	const additionNode = useRef(null);
	// const [amount, setAmount] = useState(addedAmount);
	// const prevAmount = usePrevious(addedAmount);
	// useEffect(() => {
	// 	setAmount(amount => addedAmount);
	// }, [addedAmount]);
	if (additionNode && additionNode.current) {
		console.log(additionNode.current.className);
	}
	return (
		<div>
			{/* <div>prevAmount: {prevAmount}; addedAmount: {addedAmount}</div> */}
			<div className="score-container">{score}
				<div ref={additionNode} className={cx('score-addition', {
					'repeatedly-added': addedAmount && additionNode.current.className.includes('added-amount'),
					// 'same-added': addedAmount && prevAmount === addedAmount,
					'added-amount': addedAmount && additionNode.current.className.includes('repeatedly-added')
				})}>+{addedAmount}</div>
			</div>
			{/* <div>{additionNode.current}</div> */}
		</div>
	);
};

export default Card;