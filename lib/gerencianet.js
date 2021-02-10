'use strict';
const axios = require('axios');
var config = require('./utils/config');
const utils = require('./utils/utils');

class Gerencianet {
	criarCobranca(body, token) {
		let requisicao = {
			method: 'PUT',
			url: config.pix_url_cob + utils.generateTxid('DINAMICO'),
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};
		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	criarCobrancaImediata(body, token) {
		let requisicao = {
			method: 'POST',
			url: config.pix_url_cob,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};
		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	revisarCobranca(body, token, txid) {
		let requisicao = {
			method: 'patch',
			url: config.pix_url_cob + txid,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarCobranca(token, txid) {
		let requisicao = {
			method: 'GET',
			url: config.pix_url_cob + txid,
			headers: {
				authorization: 'Bearer ' + token,
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	listarCobrancas(token, inicio, fim, cpf, cnpj, status, itensPorPagina, paginaAtual) {
		let params = '';

		if (!inicio || !fim)
			throw "Os filtros 'inicio' e 'fim' são OBRIGATÓRIOS e devem ser informados na chamada da function";
		else params += '?inicio=' + inicio + '&fim=' + fim;

		if (cpf && cnpj) {
			throw "O filtro 'cpf' não pode ser utilizado ao mesmo tempo que o 'CNPJ'";
		}
		if (cpf) params += '&cpf=' + cpf;
		if (cnpj) params += '&cnpj=' + cnpj;

		let vetStatus = ['ATIVA', 'CONCLUIDA', 'REMOVIDA_PELO_USUARIO_RECEBEDOR', 'REMOVIDA_PELO_PSP'];
		if (status) {
			if (!vetStatus.includes(status))
				throw "O filtro 'status' informado é inválido. O parâmetro somente deve conter um dos seguintes valores: ['ATIVA', 'CONCLUIDA', 'REMOVIDA_PELO_USUARIO_RECEBEDOR', 'REMOVIDA_PELO_PSP']";
			params += '&status=' + status;
		}

		if (itensPorPagina <= 0) throw "O filtro 'itensPorPagina' deve ser um número entre 1 e 1000";
		if (paginaAtual < 0) throw "O filtro 'paginaAtual' deve ser um número maior ou igual a 0";

		if (itensPorPagina) params += '&itensPorPagina=' + itensPorPagina;

		if (paginaAtual) params += '&paginaAtual=' + paginaAtual;

		var requisicao = {
			method: 'GET',
			url: config.pix_url_cob + params,
			headers: {
				authorization: 'Bearer ' + token,
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarPixRecebidos(
		token,
		inicio,
		fim,
		cpf,
		cnpj,
		itensPorPagina,
		paginaAtual,
		txid,
		txIdPresente,
		devolucaoPresente
	) {
		let params = '';

		if (!inicio || !fim)
			throw "Os filtros 'inicio' e 'fim' são OBRIGATÓRIOS e devem ser informados na chamada da function";
		else params += '?inicio=' + inicio + '&fim=' + fim;

		if (cpf && cnpj) throw "O filtro 'cpf' não pode ser utilizado ao mesmo tempo que o 'CNPJ'";
		if (cpf) params += '&cpf=' + cpf;
		if (cnpj) params += '&cnpj=' + cnpj;
		if (itensPorPagina) params += '&itensPorPagina=' + itensPorPagina;
		if (paginaAtual) params += '&paginaAtual=' + paginaAtual;
		if (txid) params += '&txid=' + txid;
		if (txIdPresente) params += '&txIdPresente=' + txIdPresente;
		if (devolucaoPresente) params += '&devolucaoPresente=' + devolucaoPresente;

		var requisicao = {
			method: 'GET',
			url: config.pix_url + params,
			headers: {
				authorization: 'Bearer ' + token,
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarPIX(token, e2eId) {
		let requisicao = {
			method: 'GET',
			url: config.pix_url + e2eId,
			headers: {
				authorization: 'Bearer ' + token,
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	requisitarEnvioPix(body, token) {
		let requisicao = {
			method: 'post',
			url: config.pix_url,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	solicitarDevolucao(token, body, e2eId) {
		let requisicao = {
			method: 'PUT',
			url: config.pix_url + e2eId + '/devolucao/' + utils.generateTxid('ESTATICO'),
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarDevolucao(token, e2eId) {
		let requisicao = {
			method: 'GET',
			url: config.pix_url + e2eId + '/devolucao/' + utils.generateTxid('ESTATICO'),
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	configurarWebhookPix(token, chave, webhookUrl) {
		let requisicao = {
			method: 'PUT',
			url: config.webhook_url + chave,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: {
				webhookUrl: webhookUrl,
			},
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarListaWebhooks(token, inicio, fim) {
		let params = '';

		if (!inicio || !fim)
			throw "Os filtros 'inicio' e 'fim' são OBRIGATÓRIOS e devem ser informados na chamada da function";
		else params += '?inicio=' + inicio + '&fim=' + fim;

		let requisicao = {
			method: 'GET',
			url: config.webhook_url + params,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	cancelarWebhookPix(token, chave, webhookUrl) {
		let requisicao = {
			method: 'DELETE',
			url: config.webhook_url + chave,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	criarLocationPayload(token) {
		let requisicao = {
			method: 'POST',
			url: config.location_url,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: {
				tipoCob: 'cob',
			},
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	consultarLocations(token, inicio, fim) {
		let params = '';

		if (!inicio || !fim)
			throw "Os filtros 'inicio' e 'fim' são OBRIGATÓRIOS e devem ser informados na chamada da function";
		else params += '?inicio=' + inicio + '&fim=' + fim;

		let requisicao = {
			method: 'GET',
			url: config.location_url,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	getLocation(token, idLocation) {
		let requisicao = {
			method: 'GET',
			url: config.location_url + idLocation,
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	gerarQrCode(token, idLocation, body) {
		let requisicao = {
			method: 'GET',
			url: config.location_url + idLocation + '/qrcode',
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	desvincularLocation(token, idLocation) {
		let requisicao = {
			method: 'DELETE',
			url: config.location_url + idLocation + '/txid',
			headers: {
				authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			httpsAgent: config.agent,
			data: body,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}

	getSaldo(token) {
		let requisicao = {
			method: 'GET',
			url: config.url_base + 'saldo',
			headers: {
				authorization: 'Bearer ' + token,
			},
			httpsAgent: config.agent,
		};

		const response = axios(requisicao)
			.then()
			.catch((error) => {
				console.log(error.response.data);
			});

		return response.data;
	}
}

module.exports = new Gerencianet();
