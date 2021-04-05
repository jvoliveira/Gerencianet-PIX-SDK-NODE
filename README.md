# Gerencianet-PIX-SDK-NODE

SDK NÃO OFICIAL para utilização do PIX da Gerencianet.

## Endpoints Disponíveis
O body utilizado em todas as funções, e a obrigatoriedade dos parâmetros seguem o mesmo padrão da Gerencianet. Mais informações no link: [https://dev.gerencianet.com.br/docs/api-pix](https://dev.gerencianet.com.br/docs/api-pix)
- criarCobranca(body, token)
- criarCobrancaImediata(body, token) 
- revisarCobranca(body, token, txid)
- consultarCobranca(token, txid)
- listarCobrancas(token, inicio, fim, cpf, cnpj, status, itensPorPagina, paginaAtual)
- consultarPixRecebidos(token,inicio, fim, cpf, cnpj, itensPorPagina, paginaAtual, txid, txIdPresente, devolucaoPresente)
- consultarPIX(token, e2eId)
- requisitarEnvioPix(body, token)
- solicitarDevolucao(token, body, e2eId)
- consultarDevolucao(token, e2eId)
- configurarWebhookPix(token, chave, webhookUrl)
- consultarListaWebhooks(token, inicio, fim)
- cancelarWebhookPix(token, chave, webhookUrl)
- criarLocationPayload(token)
- consultarLocations(token, inicio, fim)
- getLocation(token, idLocation)
- gerarQrCode(token, idLocation, body)
- desvincularLocation(token, idLocation)
- getSaldo(token)
