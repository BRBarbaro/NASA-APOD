import styles from './home.module.scss'

export default function Custom404() {
  return (
    <main  className={`${styles.main}`}>
      <h1>404 - Page Not Found</h1>
      <p>Don't worry, maybe you need to look in the stars. 🚀</p>
    </main>    
  )
}