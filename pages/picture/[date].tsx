import { api } from '../../services/api'
import styles from '../home.module.scss'
import Custom404 from '../404'
import { PictureGridCard } from '../../components/PictureGridCard'
import PictureMain from '../../components/PictureMain'
import format from 'date-fns/format'

type Picture = {
  date: string;
  explanation: string;
  url: string;
  title: string;
  copyright: string;
  media_type: string;
  thumbnail_url: string;
}

type PictureProps = {
  picture: Picture;
  previousPicture: Picture;
  nextPicture: Picture;
}

export default function Picture({picture, previousPicture, nextPicture}: PictureProps) {
  if(!picture) {
    return <Custom404/>
  }

  const formatedDate = format(Date.parse(picture.date), 'eeee, d MMMM, yyyy');

  return (
    <div className={`${styles.container}`}>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>
          Picture from {formatedDate}
        </h1>
        <PictureMain {...picture} />

        <div className={`${styles.grid}`}>
          {
            previousPicture &&
            <PictureGridCard {...previousPicture}/> 
          }

          {
            nextPicture && 
            <PictureGridCard {...nextPicture}/> 
          }
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {

  const {date} = context.params

  var previousDate = new Date()
  var nextDate = new Date()

  previousDate.setTime(Date.parse(date))
  previousDate.setDate(previousDate.getDate() -1)

  nextDate.setTime(Date.parse(date))
  nextDate.setDate(nextDate.getDate() +1)

  var reqs = []

  try {
    let { data } = await api.get('apod', {
        params: {
            api_key: process.env.API_KEY,
            start_date: date,
            end_date: date,
            thumbs: true
          }
        })

    data = data[0]
    const picture  = 
      {
        date: data.date,
        explanation: data.explanation,
        url: data.hdurl ?? data.url,
        title: data.title,
        copyright: data.copyright || null,
        media_type: data.media_type,
        thumbnail_url: data.thumbnail_url || null
      }

    reqs.push(picture)

  } catch {
    reqs.push(null)
  }

  try {
    let { data : previousData } = await api.get('apod', {
      params: {
          api_key: process.env.API_KEY,
          start_date: previousDate.toISOString().substring(0, 10),
          end_date: previousDate.toISOString().substring(0, 10),
          thumbs: true
        }
      })     
  
    previousData = previousData[0]
    const previousPicture  = 
      {
        date: previousData.date,
        explanation: previousData.explanation,
        url: previousData.hdurl ?? previousData.url,
        title: previousData.title,
        copyright: previousData.copyright || null,
        media_type: previousData.media_type,
        thumbnail_url: previousData.thumbnail_url || null
      }  
    
    reqs.push(previousPicture)
  } catch {
    reqs.push(null)
  }

  try {
    let { data : nextData } = await api.get('apod', {
      params: {
          api_key: process.env.API_KEY,
          start_date: nextDate.toISOString().substring(0, 10),
          end_date: nextDate.toISOString().substring(0, 10),
          thumbs: true
        }
      })     

    nextData = nextData[0]
    const nextPicture  = 
      {
        date: nextData.date,
        explanation: nextData.explanation,
        url: nextData.hdurl ?? nextData.url,
        title: nextData.title,
        copyright: nextData.copyright || null,
        media_type: nextData.media_type,
        thumbnail_url: nextData.thumbnail_url || null
      }    
    
    reqs.push(nextPicture)

  } catch {
    reqs.push(null)
  }

    return {
      props: {
        picture : reqs[0],
        previousPicture: reqs[1],
        nextPicture : reqs[2]
      }      
    }
}