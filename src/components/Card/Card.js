import React, { useRef } from 'react';
// import cx from 'classnames';

import './Card.scss';

const Card = ({score, addedAmount, prevScore}) => {
	const additionNode = useRef(null);
	let activeClass;

	if (additionNode && additionNode.current && addedAmount) {
		switch (additionNode.current.className) {
			case 'score-addition':
				activeClass = 'score-addition added-amount';
				break;
			case 'score-addition added-amount':
				activeClass = 'score-addition repeatedly-added';
				break;
			case 'score-addition repeatedly-added':
				activeClass = 'score-addition same-added';
				break;
			default:
				activeClass = 'score-addition added-amount';
				break;
		}
	}
	return (
		<div className="score-container">{score}
			<div ref={additionNode} className={activeClass}>+{addedAmount}</div>
		</div>
	);
};

export default Card;