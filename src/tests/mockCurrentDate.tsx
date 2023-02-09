const mockCurrentDate = (now: number | Date) => {
  jest.useFakeTimers();
  jest.setSystemTime(now);
};

const resetMockCurrentDate = () => {
  jest.useRealTimers();
};

export { mockCurrentDate, resetMockCurrentDate };
