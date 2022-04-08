import styles from './loader.module.scss'

export default function Loader(props) {

     return (
          // <Layout>

          <main className={styles.bg}  >
               <h1 className={styles.title}>
                    Loading ...
               </h1>
               {/* <h2 className={styles.subTitle}>
                    Page Not Found!
               </h2> */}
               {/* <button className={styles.homeBtn}>
                    <Link href='/' >
                         <a className={styles.link} >
                              Go Home
                         </a>
                    </Link>
               </button> */}
          </main>
          // </Layout>
     )
}