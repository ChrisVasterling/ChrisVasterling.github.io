import { useEffect, useState } from 'react';

interface useScrollReturnType {
  position: number[]
  direction: 'up' | 'down'
  sensitive: {
    position: useScrollReturnType['position']
    direction: useScrollReturnType['direction']
  }
}

interface useScrollArgs {
  // The scroll distance required to update scrollInfo.sensitive from its previous value.
  sensitivity: number | 0
}

export default function useScroll (args: useScrollArgs): useScrollReturnType {
  const [scrollInfo, setScrollInfo] = useState<useScrollReturnType>({
    position: [0, 0],
    direction: 'down',
    sensitive: {
      position: [0, 0],
      direction: 'down'
    }
  });

  const handleWindowScroll = (e: Event): void => {
    const scrollYDiff = Math.abs(window.scrollY - scrollInfo.sensitive.position[1]);
    let sensitiveInfo: useScrollReturnType['sensitive'] = {
      position: scrollInfo.sensitive.position,
      direction: scrollInfo.sensitive.direction
    };

    if (scrollYDiff >= args.sensitivity) {
      sensitiveInfo = {
        position: [window.scrollX, window.scrollY],
        direction: window.scrollY > scrollInfo.position[1] ? 'down' : 'up'
      };
    }

    setScrollInfo({
      position: [window.scrollX, window.scrollY],
      direction: window.scrollY > scrollInfo.position[1] ? 'down' : 'up',
      sensitive: sensitiveInfo
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
