import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import Auth from '../../users/Auth';

class HeaderDropdown extends Component {
	constructor(props) {
		super(props);

		this.mounted = false;

		this.state = {
			expand: false,
			username: Auth.getUser().username
		};

		this.toggle = this.toggle.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
	}

	componentDidMount() {
		this.mounted = true;
		document.addEventListener('click', this.handleDocumentClick, false);
	}

	componentWillUnmount() {
		this.mounted = false;
		document.removeEventListener('click', this.handleDocumentClick, false);
	}

	toggle() {
		this.setState({
			expand: !this.state.expand
		});
	}

	handleDocumentClick(e) {
		if (this.mounted) {
			if (!ReactDOM.findDOMNode(this).contains(e.target)) {
				this.setState({expand: false})
			}
		}
	}

	render() {
		let dropdownOpen = this.state.expand ? 'dropdown open' : 'dropdown';

		return (
			<li className={dropdownOpen}>
				<a href="javascript:void(0);" className="dropdown-toggle" onClick={this.toggle}>
					{this.state.username} <span className="caret" />
				</a>
				<ul className="dropdown-menu languages">
					<li>
						<Link to="/admin/users/logout">
							Logout
						</Link>
					</li>
				</ul>
			</li>
		);
	}
}

export default withRouter(HeaderDropdown);