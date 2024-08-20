import './Cards.css'
import Card from '../card/Card'
import React from 'react'

function Cards(props) {
	return (
		<div className="Cards">
			<div className="flex-row">
				<div className="flex-col">
					<Card web3={props.web3} plan="1" warning={''} withdrawTime={'Any Time'} />
				</div>
				<div className="flex-col">
					<Card web3={props.web3} plan="2" warning={''} withdrawTime={'Any Time'} />
				</div>
				<div className="flex-col">
					<Card web3={props.web3} plan="3" warning={''} withdrawTime={'Any Time'} />
				</div>
			</div>

			<div className="flex-row" style={{ marginTop: 35 }}>
				<div className="flex-col" >
					<Card
						web3={props.web3}
						plan="4"
						warning={'* plan use capitalization of interest'}
						withdrawTime={'End of Plan'}
					/>
				</div>
				<div className="flex-col">
					<Card
						web3={props.web3}
						plan="5"
						warning={'* plan use capitalization of interest'}
						withdrawTime={'End of Plan'}
					/>
				</div>
				<div className="flex-col">
					<Card
						web3={props.web3}
						plan="6"
						warning={'* plan use capitalization of interest'}
						withdrawTime={'End of Plan'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Cards
