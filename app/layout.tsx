import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
