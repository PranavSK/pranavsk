import type { FC } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { cx } from '@/lib/utils';
import { iconMap } from '@/lib/icon-map';

interface AnimatedTooltipProps {
  icons: ReadonlyArray<keyof typeof iconMap>;
}
export const AnimatedTooltipIcons: FC<AnimatedTooltipProps> = ({ icons }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  // translate the tooltip
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {icons.map(icon => (
        <div
          className="group/icon relative"
          key={icon}
          onMouseEnter={() => setHoveredIndex(icon)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === icon && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10
                  }
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: 'nowrap'
                }}
                className="absolute z-50 flex flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl -left-1/2 -top-12 tooltip"
              >
                <div className="relative z-30 font-bold">{icon}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <span
            onMouseMove={handleMouseMove}
            className={cx(
              'relative text-2xl transition duration-500 group-hover/icon:z-30 !m-0 group-hover/icon:scale-200 !p-0',
              iconMap[icon]
            )}
          />
        </div>
      ))}
    </ul>
  );
};
