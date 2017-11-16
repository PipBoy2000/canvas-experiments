import React from 'react';

const SliderComponent = (props) =>  {
  function changeRangeValue(event) {
    props.changeHandler(event.target.value);
  }
  return (
      <input className="range-slider" type="range"
        value={props.rangeValue}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={changeRangeValue}
      />
  )
}

export default SliderComponent;
