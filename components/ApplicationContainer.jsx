import React from "react";
import styles from "@/styles/components/ApplicationContainer.module.scss";

const ApplicationContainer = (props) => {
  return <div className={styles.application_container}>{props.children}</div>;
};

export default ApplicationContainer;
