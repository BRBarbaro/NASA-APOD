import Image from 'next/image'
import styles from './styles.module.scss'
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


export function PictureGridCard( picture:Picture) {

    const formatedDate = format(Date.parse(picture.date), 'eeee, d MMMM');
    return (

        <a className={`${styles.card}`} key={picture.date} href={`/picture/${picture.date}`}>
        { 
          picture.media_type == "image" &&
          <Image className={`${styles.image}`} width={413} height={192} src={picture.url} alt={picture.title} objectFit="cover" />
        }

        { 
          picture.media_type == "video" && picture.thumbnail_url &&
          <iframe
            className={`${styles.image}`}
            width="413"
            height="192"
            src={picture.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        }
        { 
          picture.media_type == "video" && !picture.thumbnail_url &&
          <iframe src={picture.url} title="Embedded page"></iframe>
        }
        <p>{formatedDate}</p>
        <h2>{picture.title}</h2>
        <p>{picture.explanation}</p>
      </a>
    )
}