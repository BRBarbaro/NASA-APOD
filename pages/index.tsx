import Head from 'next/head'
import styles from './home.module.scss'
import { api } from '../services/api'
import { PictureGridCard } from '../components/PictureGridCard'
import PictureMain from '../components/PictureMain'

type Picture = {
  date: string;
  explanation: string;
  url: string;
  title: string;
  copyright: string;
  media_type: string;
  thumbnail_url: string;
}

type HomeProps = {
  latestPicture: Picture;
  weeklyPictures: Picture[];
}

export default function Home({ latestPicture, weeklyPictures}: HomeProps) {
  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>NASA - Astronomy Picture of the Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>
          Picture from today
        </h1>
        <PictureMain {...latestPicture} />

        <h1 className={`${styles.title}`}>
          Pictures from the last week
        </h1>

        <div className={`${styles.grid}`}>
          {
            weeklyPictures.map((ep) => {
              return <PictureGridCard {...ep} key={ep.date}/>
            })
          }

        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  var startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  
  const { data } = await api.get('apod', {
      params: {
          api_key: process.env.API_KEY,
          start_date: startDate.toISOString().substring(0, 10),
          thumbs: true
        }
      })

  const pictures = data.reverse().map(ep => {
    return {
      date: ep.date,
      explanation: ep.explanation,
      url: ep.hdurl ?? ep.url,
      title: ep.title,
      copyright: ep.copyright || null,
      media_type: ep.media_type,
      thumbnail_url: ep.thumbnail_url || null
    }
  })

  const latestPicture = pictures.shift();
  const weeklyPictures = pictures;

  return {
    props: {
      latestPicture,
      weeklyPictures,
    }
  }
}
