import React from "react";
import Modal from "../Modal/Modal";

const ErrorHandler = (props) => (
  <>
    {props.error && (
      <Modal
        title="An error occured"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </>
);

export default ErrorHandler;
