import './globals.css'

import Navbar from '../components/navbar';

export const metadata = {
  title: {
    default: 'Ryan Miville',
    template: '%s | Ryan Miville',
  },
  description: 'Developer and munger of data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-slate-800 text-white">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
