import React from 'react';

interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  className?: string;
}

const skeletonLoaderDataTestId = 'skeletonLoader';

const SkeletonLoader = ({ width, height, className }: SkeletonLoaderProps) => {
  return <div data-test-id={skeletonLoaderDataTestId} className={`skeleton-loader ${className}`} style={{ width, height }} />;
};

export default SkeletonLoader;
