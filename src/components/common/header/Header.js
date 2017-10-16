import React, {Component} from 'react';

import BurgerMenu from './BurgerMenu';
import Auth from '../../users/Auth';

class Header extends Component {
	render() {
		if (!Auth.isUserAuthenticated()) {
			return null;
		}

		return (
			<header>
				<nav className="navbar navbar-default">
					<div className="container">
						<BurgerMenu />
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;