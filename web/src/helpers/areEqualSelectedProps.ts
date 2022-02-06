const areEqualSelectedProps = (key: any, props: any) => (prevProps: any, nextProps: any) => {
  return props.every((prop: any) => prevProps[key][prop] === nextProps[key][prop]);
};

export { areEqualSelectedProps };
