import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={inter.className + " text-center"}>
        <h1 className="font-bold text-3xl">Ryan Miville&apos;s Developer Portfolio</h1>
        <br></br>
        <p>under construction</p>
      </div>
    </main>
  )
}
