import format from 'date-fns/format'
import styles from './styles.module.scss'
import Image from 'next/image'

export function Header() {
  const currentDate = format(new Date(), 'eeee, d MMMM');

  return (
    <header className={styles.headerContainer}>
      <a href={"/"}>
        <Image src={"/favicon.ico"} width={50} height={50} objectFit="cover"/>
      </a>
      <p>NASA, Astronomy Picture of the Day</p>
      <span>{currentDate}</span>
    </header>
  );
}
