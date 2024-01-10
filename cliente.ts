import * as dgram from "dgram";

const client = dgram.createSocket("udp4");

// Mensagem que você deseja enviar (no formato Buffer)
const message = Buffer.from(
  '{"passwd":"pedratijolo","reg":null,"ssid":"TP-LINK_POCKET_3040_3208E2","token":"AZgOArAf5q_dHy"}'
);

// Configurações do servidor de destino
const SERVER_PORT = 6669;
const SERVER_ADDRESS = "192.168.0.255"; // Altere para o endereço do seu servidor

// Envia a mensagem para o servidor
client.send(message, 0, message.length, SERVER_PORT, SERVER_ADDRESS, (err) => {
  if (err) {
    console.error("Erro ao enviar a mensagem:", err);
  } else {
    console.log("Mensagem enviada com sucesso.");
  }

  // Fecha o socket após enviar a mensagem (opcional)
  client.close();
});
