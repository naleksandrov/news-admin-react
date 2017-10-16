import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

import HeaderDropdown from './HeaderDropdown';

class BurgerMenu extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			expand: false,
		};
	}

	toggle() {
		$(this.refs['toggle-div']).slideToggle('fast');
		this.setState({
			expand: !this.state.expand
		});
	}

	render() {
		const burgerClasses = this.state.expand ? 'navbar-toggle collapsed' : 'navbar-toggle';

		return (
			<div>
				<div className="navbar-header">
					<button type="button" className={burgerClasses} onClick={this.toggle}>
						<span className="icon-bar" />
						<span className="icon-bar" />
						<span className="icon-bar" />
					</button>
					<NavLink to="/admin" className="navbar-brand">
						Admin
					</NavLink>
				</div>
				<div id="navbar" className='navbar-collapse collapse' ref="toggle-div">
					<ul className="nav navbar-nav">
						<li>
							<NavLink to="/admin/news/list" activeClassName="active">
								Новини
							</NavLink>
						</li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<HeaderDropdown />
					</ul>
				</div>
			</div>
		);
	}
}

export default BurgerMenu;