import styles from './loader.module.scss'

export default function Loader(props) {

     return (
          // <Layout>

          <main className={styles.bg}  >
               {/* <div className={styles.loader} ></div> */}
               <h1 className={styles.title}>
                    <span>Loading</span> <span className={styles.loader} ></span>
               </h1>
               {/* <h2 className={styles.subTitle}>
                    O
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