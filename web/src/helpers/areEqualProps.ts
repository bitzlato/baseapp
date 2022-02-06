const areEqualProps = (prevProps: any, nextProps: any) => {
  const keys = Object.keys(prevProps);

  return keys.every((key) => prevProps[key] === nextProps[key]);
};

export { areEqualProps };
