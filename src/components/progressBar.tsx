import React from 'react';

type Props = {
    value: number;
    totalQuestions: number;
};

const ProgressBar = (props: Props) => {
  const { value, totalQuestions } = props;
  const segmentWidth = 100 / totalQuestions;

  return (
    <div
      className="w-full bg-secondary rounded-full h-2.5 relative"
      data-testid="progress-bar-outer"
    >
      <div
        className="absolute top-0 left-0 h-2.5 bg-primary rounded-md"
        style={{ width: `${value}%` }}
        data-testid="progress-bar-inner"
      />
      {totalQuestions > 1 &&
        [...Array(totalQuestions - 1)].map((_, index) => (
          <div
            key={index}
            className="absolute top-0 h-2.5 bg-white"
            style={{
              left: `${segmentWidth * (index + 1)}%`,
              width: '1px',
            }}
          />
        ))}
    </div>
  );
};

export default ProgressBar;
