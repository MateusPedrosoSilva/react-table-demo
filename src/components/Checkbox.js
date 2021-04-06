import React, { useRef, forwardRef, useEffect } from 'react';

export const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type='Checkbox' ref={resolvedRef} {...rest} />
    </>
  )
});
