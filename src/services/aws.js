const AWS = require("aws-sdk");

// Configurar as credenciais e a região da AWS
AWS.config.update({
  accessKeyId: "AKIA6RHE4LCSHJX6I7UH",
  secretAccessKey: "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",
  region: "sa-east-1", // Ex: 'us-east-1'
});

// Criar um novo objeto SES
const ses = new AWS.SES();

// Definir o conteúdo do e-mail
const params = {
  Destination: {
    ToAddresses: ["lsbgustavo@gmail.com"], // Endereço do destinatário
  },
  Message: {
    Body: {
      Text: {
        Data: "Corpo do e-mail",
      },
    },
    Subject: {
      Data: "Assunto do e-mail",
    },
  },
  Source: "KaneiskPoalwd@hotmail.com", // Endereço do remetente (não verificado no modo de teste)
};

// Enviar o e-mail
ses.sendEmail(params, (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("E-mail enviado:", data);
  }
});
