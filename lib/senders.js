function sender(application, filename, line, network, host, version, uniqueId, brand, model, systemName, systemVersion, message, ID, token, loggerHost, service, mode) {
  switch (service) {
    case "1":
      switch (mode) {
        case "1":
          let structure11 = [];
          structure11.push("*Um novo CaptureLogger foi registrado*");
          structure11.push("ID: " + ID);
          if (message) {
            structure11.push("Message: " + message);
          }
          let customMessage11 = structure11.join('\n').toString();
          return { message: customMessage11, custom: 'MarkdownV2' }
        case "2":
          let structure12 = [];
          structure12.push("*Um novo CaptureLogger foi registrado*");
          structure12.push("ID: " + ID);
          if (message) {
            structure12.push("Message: " + message);
          }
          structure12.push("[Acessar relatório do log](" + loggerHost + "/api/view/" + ID + "/" + token + ")");
          let customMessage12 = structure12.join('\n').toString();
          return { message: customMessage12, custom: 'MarkdownV2' }
        case "3":
          let structure13 = [];
          structure13.push("<strong>Um novo CaptureLogger foi registrado</strong>");
          structure13.push("<b>ID:</b> " + ID);
          if (message) {
            structure13.push("<b>Message:</b> " + message);
          }
          if (application) {
            structure13.push("<b>Application:</b> " + application);
          }
          if (filename) {
            structure13.push("<b>Filename:</b> " + filename);
          }
          if (line) {
            structure13.push("<b>Line:</b> " + line);
          }
          if (network) {
            structure13.push("<b>Network:</b> " + network);
          }
          if (host) {
            structure13.push("<b>Host:</b> " + host);
          }
          if (version) {
            structure13.push("<b>Version:</b> " + version);
          }
          if (uniqueId) {
            structure13.push("<b>UniqueID:</b> " + uniqueId);
          }
          if (brand) {
            structure13.push("<b>Brand:</b> " + brand);
          }
          if (model) {
            structure13.push("<b>Model:</b> " + model);
          }
          if (systemName) {
            structure13.push("<b>SystemName:</b> " + systemName);
          }
          if (systemVersion) {
            structure13.push("<b>SystemVersion:</b> " + systemVersion);
          }
          structure13.push("<a href='" + loggerHost + "/api/view/" + ID + "/" + token + "'>Acessar relatório do log</a>");
          let customMessage13 = structure13.join('\n').toString();
          return { message: customMessage13, custom: 'HTML' }
      }
    case "2":
      switch (mode) {
        case "1":
          let structure21 = [];
          structure21.push("**Um novo CaptureLogger foi registrado**");
          structure21.push("**ID:** " + ID);
          if (message) {
            structure21.push("**Message:** " + message);
          }
          let customMessage21 = structure21.join('\n').toString();
          return { message: customMessage21 }
        case "2":
          let structure22 = [];
          structure22.push("**Um novo CaptureLogger foi registrado**");
          structure22.push("**ID:** " + ID);
          if (message) {
            structure22.push("**Message:** " + message);
          }
          let customMessage22 = structure22.join('\n').toString();
          return {
            message: customMessage22,
            content: {
              title: "Acessar relatório do log",
              description: "",
              url: loggerHost + "/api/view/" + ID + "/" + token,
              thumbnail: ""
            }
          }
        case "3":
          let structure23 = [];
          structure23.push("**Um novo CaptureLogger foi registrado**");
          structure23.push("**ID:** " + ID);
          if (message) {
            structure23.push("**Message:** " + message);
          }
          if (application) {
            structure23.push("**Application:** " + application);
          }
          if (filename) {
            structure23.push("**Filename:** " + filename);
          }
          if (line) {
            structure23.push("**Line:** " + line);
          }
          if (network) {
            structure23.push("**Network:** " + network);
          }
          if (host) {
            structure23.push("**Host:** " + host);
          }
          if (version) {
            structure23.push("**Version:** " + version);
          }
          if (uniqueId) {
            structure23.push("**UniqueID:** " + uniqueId);
          }
          if (brand) {
            structure23.push("**Brand:** " + brand);
          }
          if (model) {
            structure23.push("**Model:** " + model);
          }
          if (systemName) {
            structure23.push("**SystemName:** " + systemName);
          }
          if (systemVersion) {
            structure23.push("**SystemVersion:** " + systemVersion);
          }
          let customMessage23 = structure23.join('\n').toString();
          return {
            message: customMessage23,
            content: {
              title: "Acessar relatório do log",
              description: "",
              url: loggerHost + "/api/view/" + ID + "/" + token,
              thumbnail: ""
            }
          }
      }
      break;
    case "3":
      switch (mode) {
        case "1":
          let structure31 = [];
          structure31.push("*Um novo CaptureLogger foi registrado*");
          structure31.push("*ID:* " + ID);
          if (message) {
            structure31.push("*Message:* " + message);
          }
          let customMessage31 = structure31.join('\n').toString();
          return { message: customMessage31 }
        case "2":
          let structure32 = [];
          structure32.push("*Um novo CaptureLogger foi registrado*");
          structure32.push("*ID:* " + ID);
          if (message) {
            structure32.push("*Message:* " + message);
          }
          let customMessage32 = structure32.join('\n').toString();
          return {
            message: customMessage32,
            buttonText: "Acessar relatório do log",
            buttonUrl: loggerHost + "/api/view/" + ID + "/" + token
          }
        case "3":
          let structure33 = [];
          structure33.push({
            text: "*ID:*\n" + ID
          });
          if (message) {
            structure33.push({
              text: "*Message:*\n" + message
            });
          }
          if (application) {
            structure33.push({
              text: "*Application:*\n" + application
            });
          }
          if (filename) {
            structure33.push({
              text: "*Filename:*\n" + filename
            });
          }
          if (line) {
            structure33.push({
              text: "*Line:*\n" + line
            });
          }
          if (network) {
            structure33.push({
              text: "*Network:*\n" + network
            });
          }
          if (host) {
            structure33.push({
              text: "*Host:*\n" + host
            });
          }
          if (version) {
            structure33.push({
              text: "*Version:*\n" + version
            });
          }
          if (uniqueId) {
            structure33.push({
              text: "*UniqueID:*\n" + uniqueId
            });
          }
          if (brand) {
            structure33.push({
              text: "*Brand:*\n" + brand
            });
          }
          if (model) {
            structure33.push({
              text: "*Model:*\n" + model
            });
          }
          if (systemName) {
            structure33.push({
              text: "*SystemName:*\n" + systemName
            });
          }
          if (systemVersion) {
            structure33.push({
              text: "*SystemVersion:*\n" + systemVersion
            });
          }
          return {
            header: "Um novo CaptureLogger foi registrado",
            informations: structure33,
            footer: "<" + loggerHost + "/api/view/" + ID + "/" + token + "|Acessar relatório do log>"
          }
      }
      break;
    case "4":
      switch (mode) {
        case "1":
          let structure41 = [];
          structure41.push("*Um novo CaptureLogger foi registrado*");
          structure41.push("*ID:* " + ID);
          if (message) {
            structure41.push("*Message:* " + message);
          }
          let customMessage41 = structure41.join('\n').toString();
          return { message: customMessage41 }
        case "2":
          let structure42 = [];
          structure42.push("ID: " + ID);
          if (message) {
            structure42.push("Message: " + message);
          }
          let customMessage42 = structure42.join('\n').toString();
          return {
            title: "Um novo CaptureLogger foi registrado",
            subtitle: customMessage42,
            multiline: "true",
            label: "",
            icon: "DESCRIPTION",
            buttonText: "Acessar relatório do log",
            buttonUrl: loggerHost + "/api/view/" + ID + "/" + token
          }
        case "3":
          let structure43 = [];
          structure43.push({
            title: "ID",
            subtitle: ID
          });
          if (message) {
            structure43.push({
              title: "Message",
              subtitle: message
            });
          }
          if (application) {
            structure43.push({
              title: "Application",
              subtitle: application
            });
          }
          if (filename) {
            structure43.push({
              title: "Filename",
              subtitle: filename
            });
          }
          if (line) {
            structure43.push({
              title: "Line",
              subtitle: line
            });
          }
          if (network) {
            structure43.push({
              title: "Network",
              subtitle: network
            });
          }
          if (host) {
            structure43.push({
              title: "Host",
              subtitle: host
            });
          }
          if (version) {
            structure43.push({
              title: "Version",
              subtitle: version
            });
          }
          if (uniqueId) {
            structure43.push({
              title: "UniqueID",
              subtitle: uniqueId
            });
          }
          if (brand) {
            structure43.push({
              title: "Brand",
              subtitle: brand
            });
          }
          if (model) {
            structure43.push({
              title: "Model",
              subtitle: model
            });
          }
          if (systemName) {
            structure43.push({
              title: "SystemName",
              subtitle: systemName
            });
          }
          if (systemVersion) {
            structure43.push({
              title: "SystemVersion",
              subtitle: systemVersion
            });
          }
          return {
            title: "Um novo CaptureLogger foi registrado",
            subtitle: "",
            informations: structure43,
            buttons: [
              {
                text: "Acessar relatório do log",
                url: loggerHost + "/api/view/" + ID + "/" + token
              }
            ]
          }
      }
      break;
  }
}

export { sender };