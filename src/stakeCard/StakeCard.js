import './StakeCard.css'
import React from 'react'
import moment from 'moment'

function StakeCard(props) {
	return (
		<div className="StakeCard col-5 mx-auto my-2">
			<div className="ml-2">
				<div className="flex-row" style={{ justifyContent: 'space-between', padding: '0 16px' }}>
					<p className="sm-txt">Plan {props.plan / 1 + 1}</p>
					<p className="sm-txt">{props.finish * 1000 <= new Date().getTime() ? 'Finish' : 'Active'}</p>
					<p className="sm-txt">{moment(props.start * 1000).format('DD MMM')} →</p>
				</div>
				<div className="flex-row" style={{ justifyContent: 'space-between', padding: '0 16px' }}>
					<p className="sm-txt">{(props.percent / 10).toFixed(1)}%</p>
					<p className="sm-txt">{moment(props.finish * 1000).format('DD MMM')}</p>
				</div>
				<div className="flex-row" style={{ justifyContent: 'space-between', padding: '0 16px' }}>
					<p className="bg-txt">{(props.amount / 1e18).toFixed(3)}</p>
					<p className="bg-txt">{(props.profit / 1e18).toFixed(3)}</p>
				</div>

				<div className="progress">
					<div
						className="progress-bar sm-txt"
						style={{
							hight: '3rem',
							width:
								(((new Date() / 1e3 - props.start) / (props.finish - props.start)) * 100).toFixed(2) +
								'%',
						}}></div>
				</div>
			</div>
		</div>
	)
}

export default StakeCard
