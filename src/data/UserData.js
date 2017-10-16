import Data from './Data';
import {API_URL} from '../constants';

class UserData {
	static login(user) {
		return Data.post(`${API_URL}user/login`, user);
	}
}

export default UserData;