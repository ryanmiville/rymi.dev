'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
  '/blog': {
    name: 'blog',
  },
};

export default function Nav() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
          <nav id="nav" className="flex justify-end px-4 text-slate-400"  >
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'transition-all hover:text-slate-200 text-xl px-[10px] py-[5px]',
                      {
                      'text-white' : isActive,
                        'font-bold': isActive,
                      }
                    )}
                  >
                    <span className={clsx({'text-white' : isActive})}>
                      {name}
                    </span>
                  </Link>
                );
              })}
          </nav>
  );
}