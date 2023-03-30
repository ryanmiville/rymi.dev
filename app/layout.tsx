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
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
