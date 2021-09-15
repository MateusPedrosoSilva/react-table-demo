import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Roterizador from './Roterizador';
import Reenvio from './reenvioRota';

export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Roterizador} />
      <Route path="/reenvio" component={Reenvio} />
    </Router>
  );
}