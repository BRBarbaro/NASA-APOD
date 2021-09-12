import Image from 'next/image'
import styles from './styles.module.scss'

type Picture = {
    date: string;
    explanation: string;
    url: string;
    title: string;
    copyright: string;
    media_type: string;
    thumbnail_url: string;
  }

export default function PictureMain(picture: Picture) {
    return (
        <a className={`${styles.maincard}`} href={`/picture/${picture.date}`}>
          { 
            picture.media_type == "image" &&
            <Image className={`${styles.image}`} width={900} height={600} src={picture.url} alt={picture.title} objectFit="cover" />
          }

          { 
            picture.media_type == "video" && picture.thumbnail_url &&
            <iframe
              className={`${styles.image}`}
              width="853"
              height="480"
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
          <br/>
          <h2>{picture.title}</h2>
          <p>{picture.explanation}</p>
          { picture.copyright && 
            <span>
              copyright : {picture.copyright}
            </span> 
          }
        </a>
    )
}