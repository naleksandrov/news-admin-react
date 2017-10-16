import $ from 'jquery';
import Auth from '../components/users/Auth';

function requester(method, url, data, headers = {}, authenticated) {
	if (authenticated) {
		headers['x-access-token'] = Auth.getToken();
	}

	return $.ajax({
		method: method,
		url: url,
		headers: headers,
		data: data,
		dataType: 'json'
	});
}

class Data {
	static get(url) {
		return requester('GET', url);
	}

	static post(url, data) {
		return requester('POST', url, data);
	}

	static put(url, data) {
		return requester('PUT', url, data, {}, true);
	}
}

export default Data;