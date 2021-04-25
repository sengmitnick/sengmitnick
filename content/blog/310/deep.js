import * as React from 'react';

function deepEqual(n, o) {
  return JSON.stringify(n) === JSON.stringify(o)
}

function useDeepMemoize(value) {
  const ref = React.useRef()
  const signalRef = React.useRef(0)

  if (!deepEqual(value, ref.current)) {
    ref.current = value
    signalRef.current += 1
  }

  return [signalRef.current]
}

function useEffectDeep(callback, dependencies) {
  return React.useEffect(callback, useDeepMemoize(dependencies))
}

export default useEffectDeep