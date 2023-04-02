import './globals.css'

import Nav from '../components/nav';

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
    <html lang="en" className="bg-gradient-to-tr from-slate-800 to-sky-900 text-white h-screen">
      {/* <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto"> */}
      <body className="">
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
