function makerSender(application, version, brandName, brandVersion, systemName, systemVersion, architecture, message, ID, token, loggerHost, service, mode) {
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
          if (version) {
            structure13.push("<b>Version:</b> " + version);
          }
          if (architecture) {
            structure13.push("<b>Device:</b> Desktop");
            if (brandName) {
              structure13.push("<b>Browser:</b> " + brandName);
            }
            if (brandVersion) {
              structure13.push("<b>Browser version:</b> " + brandVersion);
            }
            if (systemName) {
              structure13.push("<b>SystemName:</b> " + systemName);
            }
            if (systemVersion) {
              structure13.push("<b>SystemVersion:</b> " + systemVersion);
            }
            structure13.push("<b>Architecture:</b> " + architecture);
          } else {
            structure13.push("<b>Device:</b> Mobile");
            if (brandName) {
              structure13.push("<b>Brand:</b> " + brandName);
            }
            if (brandVersion) {
              structure13.push("<b>Model:</b> " + brandVersion);
            }
            if (systemName) {
              structure13.push("<b>SystemName:</b> " + systemName);
            }
            if (systemVersion) {
              structure13.push("<b>SystemVersion:</b> " + systemVersion);
            }
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
          if (version) {
            structure23.push("**Version:** " + version);
          }
          if (architecture) {
            structure23.push("**Device:** Desktop");
            if (brandName) {
              structure23.push("**Browser:** " + brandName);
            }
            if (brandVersion) {
              structure23.push("**Browser version:** " + brandVersion);
            }
            if (systemName) {
              structure23.push("**SystemName:** " + systemName);
            }
            if (systemVersion) {
              structure23.push("**SystemVersion:** " + systemVersion);
            }
            structure23.push("**Architecture:** " + architecture);
          } else {
            structure23.push("**Device:** Mobile");
            if (brandName) {
              structure23.push("**Brand:** " + brandName);
            }
            if (brandVersion) {
              structure23.push("**Model:** " + brandVersion);
            }
            if (systemName) {
              structure23.push("**SystemName:** " + systemName);
            }
            if (systemVersion) {
              structure23.push("**SystemVersion:** " + systemVersion);
            }
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
          if (version) {
            structure33.push({
              text: "*Version:*\n" + version
            });
          }
          if (architecture) {
            structure33.push({
              text: "*Device:*\n Desktop"
            });
            if (brandName) {
              structure33.push({
                text: "*Browser:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure33.push({
                text: "*Browser version:*\n" + brandVersion
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
            structure33.push({
              text: "*Architecture:*\n" + architecture
            });
          } else {
            structure33.push({
              text: "*Device:*\n Mobile"
            });
            if (brandName) {
              structure33.push({
                text: "*Brand:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure33.push({
                text: "*Model:*\n" + brandVersion
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
          if (version) {
            structure43.push({
              title: "Version",
              subtitle: version
            });
          }
          if (architecture) {
            structure43.push({
              title: "Device",
              subtitle: "Desktop"
            });
            if (brandName) {
              structure43.push({
                title: "Browser",
                subtitle: brandName
              });
            }
            if (brandVersion) {
              structure43.push({
                title: "Browser version",
                subtitle: brandVersion
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
            structure43.push({
              title: "Architecture",
              subtitle: architecture
            });
          } else {
            structure43.push({
              title: "Device",
              subtitle: "Mobile"
            });
            if (brandName) {
              structure43.push({
                text: "*Brand:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure43.push({
                title: "Model",
                subtitle: brandVersion
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

export { makerSender };