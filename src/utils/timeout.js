const timeout = (callback) => {
  return setTimeout(() => {
    callback();
  }, 10000);
};

export default timeout;
