import React, { useState, useEffect } from 'react';

export const Carouselcontrol = (props) => {
  console.log(props)
  return (
    <img onClick={props.clickHandler(props.index)}
      src={props.mainEvents[props.index]?.image || "error"}
      fallback={props.fallbackImg}
      alt="mainEvent"
    >
    </img >
  )
}


export default Carouselcontrol