import React from 'react';

type Props = {
  value: number;
};

const ProgressBar = (props: Props) => {
  return (
    <div
      className="w-full bg-secondary rounded-full h-2.5"
      data-testid="progress-bar-outer"
    >
      <div
        className="bg-primary h-2.5 rounded-md"
        style={{ width: `${props.value}%` }}
        data-testid="progress-bar-inner"
      ></div>
    </div>
  );
};

export default ProgressBar;
