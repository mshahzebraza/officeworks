import Layout from '../components/Layout/Layout'
import styles from '../styles/404.module.scss'
import Link from 'next/link'

export default function defaultFallback(props) {

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
                    <Link href='/' >
                         <a className={styles.link} >
                              Go Home
                         </a>
                    </Link>
               </button>
          </main>
          // </Layout>
     )
}