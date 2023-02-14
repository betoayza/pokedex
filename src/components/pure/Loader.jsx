import React from "react";
import { Modal } from "./Modal";
import "./Loader.css";

export const Loader = () => {
  return (
    <Modal>
      <div id="loading-parent-div">
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    </Modal>
  );
};
