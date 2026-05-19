import React, { Component } from "react";
import "./deg-death-screen.css";

class DegDeathScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { error: this.props.error || null };
	}

	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo);
		this.setState({ error });
	}

	handleReboot() {
		this.setState({ error: null });
		this.props.reboot();
	}

	render() {
		if (!this.state.error) return this.props.children;
		return (
			<div className="container">
				<h1>:0</h1>
				<h2 className="heading">We are so sorry, but Deg encountered an error that couldn't be handled.</h2>
				{this.state.error ? (
					<>
						<p>Please report this error:</p>
						<details className="error">
							{this.state.error}
						</details>
					</>
				) : (
					<p>Please report what you were doing when this happened.</p>
				)}
				{this.props.reboot ? (
					<>
						<p>You can try rebooting the system.</p>
						<button onClick={this.handleReboot} className="reboot-button">
							Reboot
						</button>
					</>
				) : (
					<p>Please restart the system manually.</p>
				)}
			</div>
		);
	}
}

export default DegDeathScreen;
