module.exports = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Backend Cafeteria",
      version: "1.0.0",
      description: "Backend para cafeterias/",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
