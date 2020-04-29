import { useRef, useEffect } from 'react';

{/**A React hook that tells if the component is mounted
    https://gist.github.com/jaydenseric/a67cfb1b809b1b789daa17dfe6f83daa
*/}
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
}

export function randomNumber(max) {
    return (Math.floor(1 + Math.random() * max))
}

