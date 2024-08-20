import './Footer.css'
import React from 'react'
import base from '../assets/base.svg'
import metamask from '../assets/metamask.svg'
import eth from '../assets/eth.svg'
import footer1 from '../assets/footer-1.svg'

function Footer() {
	return (
		<div className="Footer">
			<div className='badge-items'>
				<img src={base} alt="base" className='item'></img>
				<img src={metamask} alt='metamask' className='item'></img>
				<img src={eth} alt="eth" className='item'></img>
			</div>
			<h6 className='footer1-item'>Powered by &nbsp; <img src={footer1} alt='footer1'></img> &nbsp; precipitate.ai</h6>
			<div className='footer-text'>
				<p>All rights reserved  © 2024 BaseStake</p>
			</div>
		</div>
	)
}

export default Footer
