const dgram = require("dgram");

// Configuração do servidor UDP
const server = dgram.createSocket("udp4");

// Manipulador de eventos para quando o servidor recebe dados
server.on("message", (msg, rinfo) => {
  const prev = msg.toString().replaceAll(/\{.*/g, "");
  const next = msg.toString().replaceAll(/.*\}/g, "");
  const mensagem = msg
    .toString()
    .replaceAll(/^.*\{/g, "{")
    .replaceAll(/\}.*$/g, "}");

  console.log(
    `Mensagem recebida: ${mensagem} de ${rinfo.address}:${rinfo.port}`
  );

  // Aqui você pode processar a mensagem conforme necessário
  // Exemplo: analisar a mensagem como JSON

  console.log();

  // Função para converter um byte em formato hexadecimal
  function byteToHexString(byte) {
    return "0" + byte.toString(16);
  }

  // Converte a string do buffer em formato hexadecimal
  let hexString = "";
  for (let i = 0; i < msg.length; i++) {
    hexString += " " + byteToHexString(msg[i]);
  }

  console.log(hexString);

  try {
    const jsonData = JSON.parse(
      msg.toString().replaceAll(/^.*\{/g, "{").replaceAll(/\}.*$/g, "}")
    );
    console.log("Dados JSON:", jsonData);
    // Faça o que precisar com os dados JSON
    server.close();
  } catch (error) {
    console.error("Erro ao analisar a mensagem como JSON:", error);
    server.close();
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
