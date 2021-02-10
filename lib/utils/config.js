'use strict';
const https = require('https');
const fs = require('fs');

let rawdata = fs.readFileSync(__dirname + '/../../config.json');
const obj = JSON.parse(rawdata);

class config {
	constructor() {
		if (obj.sandbox) {
			//Insira o caminho do seu certificado de DESENVOLVIMENTO
			this.caminho_certificado = obj.caminho_certificado_DESENVOLVIMENTO;
			//Insira sua client_id de DESENVOLVIMENTO
			this.client_id = obj.client_id_DESENVOLVIMENTO;
			//Insira sua client_secret de DESENVOLVIMENTO
			this.client_secret = obj.client_secret_DESENVOLVIMENTO;

			this.url_base = 'https://api-pix-h.gerencianet.com.br/';
			this.pix_url_auth = 'https://api-pix-h.gerencianet.com.br/oauth/token';
			this.pix_url_cob = 'https://api-pix-h.gerencianet.com.br/v2/cob/';
			this.pix_url = 'https://api-pix-h.gerencianet.com.br/v2/pix/';
			this.webhook_url = 'https://api-pix-h.gerencianet.com.br/v2/webhook/';
			this.location_url = 'https://api-pix-h.gerencianet.com.br/v2/loc/';
		} else {
			//Insira o caminho do seu certificado de PRODUÇÃO
			this.caminho_certificado = obj.caminho_certificado_PRODUCAO;
			//Insira sua client_id de PRODUÇÃO
			this.client_id = obj.client_id_PRODUCAO;
			//Insira sua client_secret de PRODUÇÃO
			this.client_secret = obj.client_secret_PRODUCAO;

			this.url_base = 'https://api-pix.gerencianet.com.br/';
			this.pix_url_auth = 'https://api-pix.gerencianet.com.br/oauth/token';
			this.pix_url_cob = 'https://api-pix.gerencianet.com.br/v2/cob/';
			this.pix_url = 'https://api-pix.gerencianet.com.br/v2/pix/';
			this.webhook_url = 'https://api-pix.gerencianet.com.br/v2/webhook/';
			this.location_url = 'https://api-pix.gerencianet.com.br/v2/loc/';
		}

		var certificado = fs.readFileSync(this.caminho_certificado);
		this.data_credentials = this.client_id + ':' + this.client_secret;
		this.agent = new https.Agent({
			pfx: certificado,
			passphrase: '',
		});
	}
}

module.exports = new config();
