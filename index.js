var gn = require('./lib/gerencianet')
var utils = require('./lib/utils/utils')

async function index(){

    let body = {
        "calendario": {
            "expiracao": 3600
        },
        "devedor": {
            "cpf": "12345678909",
            "nome": "Francisco da Silva"
        },
        "valor": {
            "original": "123.45"
        },
        "chave": "+5522999486347",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
    }
    let token = ""
    token = await utils.gerarToken()
    
    gn.criarCobrancaImediata(body, token);
}

index()
