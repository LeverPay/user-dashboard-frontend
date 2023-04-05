import React, { useContext } from "react";
import {
  SourceContext,
  AltContext,
  ClassContext,
} from "../../page/ProfilePage/ProfilePage";

const ImageComponent = () => {
  const sourceContext = useContext(SourceContext);
  const altContext = useContext(AltContext);
  const classContext = useContext(ClassContext);
  return (
    <div>
      <img src={sourceContext} alt={altContext} className={classContext} />
    </div>
  );
};

export default ImageComponent;
