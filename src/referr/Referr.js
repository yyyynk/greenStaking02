import './Referr.css'
import bckImg from '../assets/blue-rectangle.svg'
import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { findUserDownline, getUserReferralAmount, getUserTotalDeposits, getUserAvailable, withdraw } from '../utils.js'

function Referr(props) {
	const [loading, setLoading] = useState(false)
	const [spinnerLoading, setSpinnerLoading] = useState(false)
	const [userDownline, setUserDownline] = useState(0)
	const [userReferralTotalBonus, setUserReferralTotalBonus] = useState(0)
	const [userReferralWithdrawn, setUserReferralWithdrawn] = useState(0)
	const [userTotalDeposits, setUserTotalDeposits] = useState(0)
	const [userAvailable, setUserAvailable] = useState(0)
	const [referralLink, setReferralLink] = useState('')
	// const [totalStake, setTotalStale] = useState(0);

	useEffect(() => {
		const init = async () => {
			try {
				setLoading(true)
				if (props.web3 === undefined) return
				const account = (await props.web3.eth.getAccounts())[0]
				// const account = '0x494CEAF0059560852Aaf44310988C2d2a700C5a6'
				const userDownline = await findUserDownline(props.web3, account)
				const { totalBonus, bonusWithdrawn } = await getUserReferralAmount(props.web3, account)
				const totalDeposit = await getUserTotalDeposits(props.web3, account)
				const userAvailable = await getUserAvailable(props.web3, account)
				const domain = window.location.href.split('?')[0]
				setUserDownline(userDownline)
				setUserReferralTotalBonus(totalBonus)
				setUserReferralWithdrawn(bonusWithdrawn)
				setUserTotalDeposits(totalDeposit)
				setUserAvailable(userAvailable)
				setReferralLink(domain + '?ref=' + account)
				setLoading(false)
			} catch (e) {
				console.error(`Error at Referr ${e.message}`)
			}
		}
		init()
	}, [props])

	const userWithdraw = async () => {
		try {
			setLoading(true)
			setSpinnerLoading(true)
			if (props.web3 === undefined) return
			await withdraw(props.web3, (await props.web3.eth.getAccounts())[0])
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
		<div className="Referr">
			{loading === true ? <Spinner /> : null}
			<div className="flex-row">
				<div id="staked">
					<p className='sm-txt'>YOUR TOTAL ETH STAKED</p>
					<p className="bg-txt">{userTotalDeposits}</p>
					<p className='sm-txt'>ETH AVAILABLE FOR WITHDRAW</p>
					<p className="bg-txt">{userAvailable}</p>
					<button className="cta-fw" onClick={userWithdraw}>
						<span>WITHDRAW ETH</span>
						{spinnerLoading === true ? (
							<Spinner className="text-align-center mx-2" animation="border" role="status" />
						) : null}
					</button>
				</div>

				<div id="referral">
					<div className="flex-col">
						<p className="sm-txt" style={{ margin: '0 0 16px 0' }}>
						Your referral link
						</p>

						<div className="flex-row">
							<div className="input sm-txt">{referralLink}</div>
							<button
								className="cta"
								style={{ marginRight: 15 }}
								onClick={() => navigator.clipboard.writeText(referralLink)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									width="20"
									height="20"
									fill="currentColor"
									className="mt-0">
									<path
										fillRule="evenodd"
										d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
									<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
									<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
								</svg>
							</button>
						</div>

						<div className="flex-row" style={{ marginTop: 25 }}>
							<div className="flex-col" style={{ width: '30%', padding: 0 }}>
								<p className="sm-txt">TOTAL ETH EARNED</p>
								<p className="bg-txt">{userReferralTotalBonus}</p>
								<p className="sm-txt">USERS INVITED BY YOU</p>
								<p className="bg-txt">{userDownline}</p>
							</div>

							<div className="flex-col" style={{ width: '30%', padding: 0 }}>
								<p className="sm-txt">TOTAL ETH WITHDRAW</p>
								<p className="bg-txt">{userReferralWithdrawn}</p>
							</div>

							<div className="flex-col" id="earn-staked-text">
								<p className="sm-txt">Earn by promoting BaseStake!</p>

								<p className="sm-txt">You will receive:</p>
								<p className="sm-txt">5% from each level 1 referral deposits</p>
								<p className="sm-txt">2.5% from each level 2 referral deposits</p>
								<p className="sm-txt">0.5% from each level 3 referral deposits</p>
								<p className="sm-txt italic">
									Note! You DO NOT need to have any deposits to start receive earnings
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Referr
