import * as dgram from "dgram";

// Configuração do servidor UDP
const server = dgram.createSocket("udp4");

// Manipulador de eventos para quando o servidor recebe dados
server.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  console.log(
    `Mensagem recebida: ${msg.toString().replace()} de ${rinfo.address}:${
      rinfo.port
    }`
  );

  // Aqui você pode processar a mensagem conforme necessário
  // Exemplo: analisar a mensagem como JSON
  try {
    const jsonData = JSON.parse(msg.toString());
    console.log("Dados JSON:", jsonData);
    // Faça o que precisar com os dados JSON
  } catch (error) {
    console.error("Erro ao analisar a mensagem como JSON:", error);
  }
});

// Manipulador de eventos para quando o servidor está pronto
server.on("listening", () => {
  const address = server.address();
  console.log(`Servidor UDP escutando em ${address.address}:${address.port}`);
});

// Inicia o servidor na porta desejada
const PORT = 6669;
server.bind(PORT);

// Manipulador de eventos para lidar com erros
server.on("error", (err) => {
  console.error(`Erro no servidor: ${err.stack}`);
  server.close();
});

// Você pode adicionar mais lógica conforme necessário

// Para interromper o servidor, você pode usar:
// server.close();
