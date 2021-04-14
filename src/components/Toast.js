import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const Toast = (props) => {
  const { title, content } = props;

  return (
    <>
      <Icon name="clear" size="18px" />
      <div className="toast-inner-content">
        {title && <h4>{title}</h4>}
        <p>{content}</p>
      </div>
    </>
  );
};

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  info: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

export default Toast;
