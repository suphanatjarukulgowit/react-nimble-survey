import React from 'react';

interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  className?: string;
  dataTestId: string;
}

const SkeletonLoader = ({ width, height, className, dataTestId }: SkeletonLoaderProps) => {
  return <div data-test-id={dataTestId} className={`skeleton-loader ${className}`} style={{ width, height }} />;
};

export default SkeletonLoader;
