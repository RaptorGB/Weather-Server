import * as restify from "restify";
import * as login from "login";

export class Index {

  constructor() {
    this.server = restify.createServer();
    this.server.use(restify.plugins.queryParser());
    this.getRoutes();
  }

  getRoutes() {

    this.server.get("/login/:type", (req, res, next) => { //idea being type is going to be either facebook or google

      console.log("req>", req.query); //Want to pass the query to the necessary controller.

      login.processLogin(req);

    });

    this.server.listen(3000);
  }

};

new Index();
