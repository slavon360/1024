import React, { useEffect } from 'react';
import cx from 'classnames';

import './Card.scss';

const Card = ({score, addedAmount}) => {
	// const [amount, setAmount] = useState(addedAmount);

	useEffect(() => {
		console.log('addedAmount: ', addedAmount);
	}, [addedAmount]);
	return (
		<div className="score-container">{score}
			<div className={cx('score-addition', { 'switched': addedAmount })}>+{addedAmount}</div>
		</div>);
};

export default Card;