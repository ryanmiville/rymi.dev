import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={inter.className}>
        <h1>Ryan Miville&apos;s Developer Portfolio</h1>
        <p>under construction</p>
      </div>
    </main>
  )
}
