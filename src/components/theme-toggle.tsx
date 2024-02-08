import type { FC, RefObject } from 'react';
import { useRef } from 'react';

function baseToggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function createToggleHandler(element: RefObject<HTMLElement>) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return baseToggleTheme;

  return async () => {
    if (element.current === null) {
      baseToggleTheme();
      return;
    }
    await document.startViewTransition!(async () => {
      baseToggleTheme();
    }).ready;

    const { top, left, width, height } = element.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`]
      },
      {
        duration: 1000,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  };
}

export const ThemeToggle: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      id="theme-toggle"
      aria-label="Toggle Dark Mode"
      className="i-solar:sun-2-bold-duotone dark:i-solar:moon-stars-bold-duotone fixed right-6 top-6 size-4 print:hidden"
      ref={buttonRef}
      onClick={createToggleHandler(buttonRef)}
    ></button>
  );
};
