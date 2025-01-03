import { useEffect, useState } from 'react';

interface FadeProps {
  children: React.ReactNode;
  in: boolean;
  timeout?: number;
}

export default function Fade({ children, in: inProp, timeout = 150 }: FadeProps){
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (inProp) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [inProp]);

  return (
    <div style={{
      opacity,
      transition: `opacity ${timeout}ms linear`,
    }}>
      {children}
    </div>
  );
};
