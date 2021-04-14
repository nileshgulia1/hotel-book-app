import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../routes";
import { Icon } from "semantic-ui-react";
import { Slide, ToastContainer, toast } from "react-toastify";
const Contain = () => (
  <Router>
    <div>{renderRoutes(routes)}</div>
    <ToastContainer
      position={toast.POSITION.BOTTOM_CENTER}
      hideProgressBar
      transition={Slide}
      autoClose={5000}
      closeButton={
        <Icon className="toast-dismiss-action" name={"clear"} size="18px" />
      }
    />
  </Router>
);
export default Contain;
