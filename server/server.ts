import * as express from 'express';
import { Application } from 'express';
import { searchFreights } from './get-freight.route';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/freights').get(searchFreights);

const httpServer: any = app.listen(9000, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
      httpServer.address().port
  );
});
