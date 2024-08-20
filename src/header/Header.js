import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import logo from '../assets/logo-blue.svg'
import telegram from '../assets/telegram.svg'
import './Header.css'

function Header(props) {
	const [showAddress, setShowAddress] = useState(false)

	const handleClose = () => setShowAddress(false)

	if (document.getElementById('web3-load-warning')) {
		return <div></div>
	}
	return (
		<div className="Header">
			<header className="Header-header">
				<div className="container-fluid">
					<div id="logo" className="flex-row">
						<img src={logo} alt="platform-logo"></img>
						<p className="bg-txt">
							BaseStake
						</p>
					</div>

					<div id="stake-price">
						<span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
							<span id="eth_symbol">ETH</span> = $3500 
							{/* ${props.assetPrice} */}
						</span>
					</div>
					<div id="header-buttons" className="flex-row">
						<a className="btn ml-1" href="http://t.me/bfarmsupport" rel="noreferrer">
							Contact
						</a>
						<a
							className="btn ml-1"
							href="https://drive.google.com/file/d/1GPF7Da5Ru8DpfJr67kbzfLwuvI8QNA9I/view?usp=sharing"
							rel="noreferrer">
							Audit
						</a>
						<a
							className="btn ml-1"
							href="https://drive.google.com/file/d/1zJ3YlovapSYVAQB6W1nPTiqfd-_09PHW/view?usp=sharing"
							rel="noreferrer">
							Presentation
						</a>
						<a
							className="btn ml-1"
							href="https://bscscan.com/address/0xa24c2687372e94f63789c297a2e6173af8d6bfce#analytics"
							rel="noreferrer">
							Cutdown
						</a>
						<a className="btn ml-1" href="http://t.me/bfarmfinance" rel="noreferrer">
							<img src={telegram} width="30px" height="30px" alt="telegram"></img>
						</a>
					</div>
				</div>
			</header>
			<Modal show={showAddress} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Account Address</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.account}</Modal.Body>
			</Modal>
		</div>
	)
}

export default Header
