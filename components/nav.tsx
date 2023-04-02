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
          <nav id="nav" className="flex justify-end py-10 px-20 text-slate-400"  >
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'transition-all hover:text-slate-200 text-xl p-5',
                      {
                      'text-slate-200' : isActive,
                        'font-bold': isActive,
                      }
                    )}
                  >
                    <span>
                      {name}
                    </span>
                  </Link>
                );
              })}
          </nav>
  );
}