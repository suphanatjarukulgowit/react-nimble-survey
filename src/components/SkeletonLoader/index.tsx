import React from 'react';

interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  className?: string;
}

const SkeletonLoader = ({ width, height, className }: SkeletonLoaderProps) => {
  return (
    <>
      <div className={`skeleton-loader ${className}`} style={{ width, height }} />
    </>
  );
};

export default SkeletonLoader;
