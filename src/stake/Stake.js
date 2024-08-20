import './Stake.css'
import StakeCard from '../stakeCard/StakeCard'
import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { getUserAmountOfDeposits, getUserDepositInfo } from '../utils.js'

function Stake(props) {
	const [loading, setLoading] = useState(false)
	const [depositDetails, setDepositDetails] = useState([])

	useEffect(() => {
		const init = async () => {
			try {
				setLoading(true)
				if (props.web3 === undefined) return
				let depositAmounts = await getUserAmountOfDeposits(props.web3)
				const depositDetailsArray = []
				for (let i = 0; i < depositAmounts; i++) {
					const depositDetails = await getUserDepositInfo(props.web3, i)
					depositDetailsArray.push(depositDetails)
				}
				setDepositDetails(depositDetailsArray)
				setLoading(false)
			} catch (e) {
				console.error(`Error at Cards ${e.message}`)
			}
		}
		init()
	}, [props])

	return (
		<div className="Stake mt-5">
			{loading === true ? <Spinner /> : null}
			{depositDetails.length > 0 ? <h2 className="bg-txt">YOUR STAKE</h2> : null}

			<div className="row my-auto">
				{depositDetails.map((e, index) => {
					return (
						<StakeCard
							key={index}
							plan={e.plan}
							percent={e.percent}
							amount={e.amount}
							start={e.start}
							finish={e.finish}
							profit={e.profit}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Stake
