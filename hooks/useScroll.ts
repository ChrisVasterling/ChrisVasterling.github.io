import { useEffect, useState } from 'react';

interface useScrollReturnType {
  position: number[]
  direction: 'up' | 'down'
}

export default function useScroll (): useScrollReturnType {
  const [scrollInfo, setScrollInfo] = useState<useScrollReturnType>({
    position: [0, 0],
    direction: 'up'
  });

  const handleWindowScroll = (e: Event): void => {
    setScrollInfo({
      position: [window.scrollX, window.scrollY],
      direction: window.scrollY > scrollInfo.position[1] ? 'down' : 'up'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [window, handleWindowScroll]);

  return scrollInfo;
}
