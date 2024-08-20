import React, { useState, useEffect } from 'react'
import './Hero.css'
import Spinner from 'react-bootstrap/Spinner'
import { totalStaked, totalBalance } from '../utils.js'

function Hero(props) {
	const [loading, setLoading] = useState(false)
	const [totalStake, setTotalStake] = useState(0)
	const [totalBalanceOf, setTotalBalanceOf] = useState(0)

	useEffect(() => {
		const init = async () => {
			try {
				setLoading(true)
				if (props.web3 === undefined) return
				const _totalStake = await totalStaked(props.web3)
				const _totalBalance = await totalBalance(props.web3)
				setTotalStake(_totalStake)
				setTotalBalanceOf(_totalBalance)
				setLoading(false)
			} catch (e) {
				console.error(`Error at Hero ${e.message}`)
			}
		}
		init()
	}, [props])

	return (
		<div className="Hero">
			{loading === true ? <Spinner /> : null}

			<div id="basic-info">
				<h6>STAKE ETH ON BASE (COMING SOON)</h6>
				<ul>
					<li>
						Total income: based on your plan (from 5% to 10% daily, increasing daily)
					</li>
					<li>
						Basic interest rate: +0.5% every 24 hours - only for new deposits, plan length reduces -0.3 days every day
					</li>
					<li>
						Minimum deposit: 0.05 ETH, no maximum limit
					</li>
					<li>
						Earnings every block, withdraw any time (if you use capitalization of interest you can withdraw only after the end of your deposit, or anytime before at 60% penalty)
					</li>
				</ul>
			</div>

			<div id="balance">
				<div className='balance-item'>
					<h5 className="d-flex flex-row">
						TOTAL ETH STAKED
					</h5>
					<p>{totalStake.toFixed(3)}</p>
				</div>

				<div className='balance-item'>
					<h5 className="d-flex flex-row">
						TOTAL CONTRACT BALANCE
					</h5>
					<p>{totalBalanceOf.toFixed(3)}</p>
				</div>
			</div>
		</div>
	)
}

export default Hero
