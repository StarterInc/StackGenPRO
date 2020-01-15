import React, { useRef } from "react";
import View from "./view";

import useDrop from "../../hooks/useDrop";

export default ({ children, heading, onDrop }) => {
  const dropRef = useRef();
  const { droppedItem } = useDrop({
    ref: dropRef,
    onDrop
  });
  return (
    <View ref={dropRef} heading={heading} droppedItem={droppedItem}>
      {children}
    </View>
  );
};
