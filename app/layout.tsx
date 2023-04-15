import './globals.css'

import Nav from '../components/nav';

export const metadata = {
  title: {
    default: 'Ryan Miville',
    template: '%s | Ryan Miville',
  },
  description: 'Web developer and data engineer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-200 mx-auto">
      {/* <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto"> */}
      <body className="">
      <Nav />
        <main className="max-w-5xl lg:mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
