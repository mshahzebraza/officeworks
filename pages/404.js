import Layout from '../components/Layout/Layout'
import styles from '../styles/404.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function defaultFallback(props) {
     const router = useRouter()
     const { query: { goto = '', caption = 'Home' }, isReady } = router;
     if (!isReady) return <div>Router Loading...</div>

     return (
          // <Layout>
          <main className={styles.bg}  >
               <h1 className={styles.title}>
                    404
               </h1>
               <h2 className={styles.subTitle}>
                    Page Not Found!
               </h2>
               <button className={styles.homeBtn}>
                    <Link href={`/${goto}`} >
                         <a className={styles.link} >
                              {`Go to ${caption}`}
                         </a>
                    </Link>
               </button>
          </main>
          // </Layout>
     )
}