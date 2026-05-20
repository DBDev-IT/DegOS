import React, { Component } from "react";
import "./death-screen.css";

class DeathScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error) {
		return { error };
	}

	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo);
		this.setState({ error });
	}

	handleReboot = () => {
		this.setState({ error: null });
		this.props.reboot();
	};

	render() {
		const error = this.props.error || this.state.error;
		if (!error) return this.props.children;
		return (
			<div className="container">
				<h1>:0</h1>
				<h2 className="heading">
					We are so sorry, but Deg encountered an error that couldn't
					be handled.
				</h2>
				{error ? (
					<>
						<p>Please report this error:</p>
						<details className="error">{error}</details>
					</>
				) : (
					<p>
						Please report what you were doing before this happened.
					</p>
				)}
				{this.props.reboot ? (
					<>
						<p>You can try rebooting the system.</p>
						<button
							onClick={this.handleReboot}
							className="reboot-button"
						>
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

export default DeathScreen;
