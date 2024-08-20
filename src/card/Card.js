import './Card.css'
import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { getResult, invest } from '../utils.js'

function Card(props) {
	const [loading, setLoading] = useState(false)
	const [spinnerLoading, setSpinnerLoading] = useState(false)
	const [deposit, setDeposit] = useState(undefined)
	const [profit, setProfit] = useState(0)
	const [totalReturn, setTotalReturn] = useState(0)
	const [days, setDays] = useState(0)
	const [dailyProfit, setDailyProfit] = useState(0)
	const [asset, setAsset] = useState('BNB')

	useEffect(() => {
		const init = async () => {
			try {
				setLoading(true)
				if (props.web3 === undefined) return
				const initialAmount = String(1e18)
				const { totalReturn, days, dailyProfit } = await getResult(
					props.web3,
					String(props.plan / 1 - 1),
					initialAmount
				)
				const domain = window.location.href.split('?')[0]
				const asset = domain.indexOf('/busd') === -1 ? 'BNB' : 'BUSD'
				setAsset(asset)
				setTotalReturn(Math.round(totalReturn))
				setDailyProfit(Math.round(dailyProfit * 10) / 10)
				setDays(days)
				setLoading(false)
			} catch (e) {
				console.error(`Error at Cards ${e.message}`)
			}
		}
		init()
	}, [props])

	const calculateProfit = async (deposit) => {
		const { profit } = await getResult(props.web3, String(props.plan / 1 - 1), String(deposit * 1e18))
		setProfit((profit / 1e18).toFixed(1))
	}

	const stake = async () => {
		try {
			setLoading(true)
			setSpinnerLoading(true)
			if (props.web3 === undefined) return
			const referrer =
				typeof window.location.href.split('ref=')[1] !== 'undefined'
					? window.location.href.split('ref=')[1]
					: '0x0000000000000000000000000000000000000000'
			await invest(props.web3, referrer, String(props.plan / 1 - 1), String(deposit * 1e18))
			setLoading(false)
			setSpinnerLoading(false)
		} catch (e) {
			console.error(e)
			alert(`Some error\n${e.message}`)
			setLoading(false)
			setSpinnerLoading(false)
		}
	}

	return (
		<div className="Card">
			{loading === true ? <Spinner /> : null}
			<div>
				<div className="plan">
					<p>Plan {props.plan}</p>
				</div>
				<div className="values">
					<div className="flex-row">
						<div className="flex-col w-50">
							<p className="sm-txt">Daily profit</p>
							<p className="bg-txt">{dailyProfit}%</p>
						</div>

						<div className="flex-col w-50">
							<p className="sm-txt">Total return</p>
							<p className="bg-txt">{totalReturn}%</p>
						</div>
					</div>

					<div className="flex-row">
						<div className="flex-col w-50">
							<p className="sm-txt">Withdraw time</p>
							<p className="bg-txt" >
								{props.withdrawTime}
							</p>
						</div>

						<div className="flex-col w-50">
							<p className="sm-txt">Days</p>
							<p className="bg-txt">{days}</p>
						</div>
					</div>

					<div className="flex-row">
						<div className="flex-col w-50">
							<p className="sm-txt">Enter amount</p>
							<input
								value={deposit}
								placeholder="10"
								type="text"
								id="plan0amount"
								className="btn staking-amount form-control form-control-lg mt-2"
								onInput={(e) => {
									setDeposit(e.target.value)
									calculateProfit(e.target.value)
								}}></input>
						</div>

						<div className="flex-col w-50">
							<p className="sm-txt">In {days} days you will get</p>
							<p className="bg-txt" style={{paddingTop: '5%'}}>
								{profit}
							</p>
						</div>
					</div>

					<button className="cta-fw" onClick={stake}>
						STAKE ETH
						{spinnerLoading === true ? (
							<Spinner className="text-align-center mx-2" animation="border" role="status" />
						) : null}
					</button>
				</div>	
				{props.warning !== '' ? (
					<div id="warnning_part">
						<p className="font-italic pt-2 wanning-text">{props.warning}</p>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Card
