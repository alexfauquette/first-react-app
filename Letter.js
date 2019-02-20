import React from 'react'

import './Letter.css'

const Letter = ({letter, feedback, index, onClick}) => (
	<div className={`letter ${feedback}`} onClick={() => onClick(letter)}>
		<span className="symbol">
			{letter}
		</span>
	</div>
)

export default Letter
