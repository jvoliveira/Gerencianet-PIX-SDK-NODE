'use strict';

const randomstring = require('randomstring');
const config = require('./config');
const axios = require('axios');

class Utils {
	generateTxid(tipoPix) {
		switch (tipoPix.toUpperCase()) {
			case 'DINAMICO':
				return randomstring.generate({ length: 35, charset: 'alphanumeric' });
			case 'ESTATICO':
				return randomstring.generate({ length: 25, charset: 'alphanumeric' });
			default:
				throw "Parâmetro 'tipoPix' inválido. \nO Parâmetro 'tipoPix' deve ser 'DINAMICO' ou 'ESTATICO'";
		}
	}

	gerarToken() {
		let auth = Buffer.from(config.data_credentials).toString('base64');
		const requisicao = {
			method: 'POST',
			url: config.pix_url_auth,
			headers: {
				Authorization: 'Basic ' + auth,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: JSON.stringify({ grant_type: 'client_credentials' }),
		};

		let userToken = axios(requisicao)
			.then((response) => {
				console.log();
				return response.data.access_token;
			})
			.catch((error) => {
				console.error(error);
			});

		return userToken;
	}
}

module.exports = new Utils();
