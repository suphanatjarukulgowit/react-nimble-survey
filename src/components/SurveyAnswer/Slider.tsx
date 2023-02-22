import React from 'react';

import ReactSlider, { SliderProps as ReactSliderProps } from 'rc-slider';

import 'rc-slider/assets/index.css';

interface SliderProps extends Omit<ReactSliderProps, 'onChange'> {
  max: number;
  onChange?: (index: number) => void;
}

interface TooltipProps {
  currentIndex: number;
  max: number;
}

const Tooltip = ({ currentIndex, max }: TooltipProps) => {
  const tooltipPosition = (currentIndex / max) * 100;
  return <div className={`tooltip`} style={{ left: `${tooltipPosition}%`, transform: 'translateX(-50%)' }}></div>;
};

const Slider = (props: SliderProps) => {
  const handleRender: SliderProps['handleRender'] = (node, { value: currentIndex }) => {
    return (
      <div>
        <Tooltip currentIndex={currentIndex} max={props.max} />
        {node}
      </div>
    );
  };

  return (
    <ReactSlider
      {...props}
      handleRender={handleRender}
      onChange={props.onChange as (index: number | number[]) => void}
      className={`slider ${props.className}`}
    />
  );
};

export default Slider;
