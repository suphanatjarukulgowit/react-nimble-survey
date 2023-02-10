import React from 'react';

// import styles from './SkeletonLoader.module.css';

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
