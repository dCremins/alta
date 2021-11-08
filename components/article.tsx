import Image from 'next/image'
import Link from 'next/link'
import { DateTime } from 'luxon'
import { Post } from '../pages/api/apis'
import styles from '../styles/Article.module.scss'

interface Props extends Post {
    index: number;
}

const Article:React.FC<Props> = ({index, id, title, author, date, preview, copy}) => {
  return (
    <Link href={`/${id}`} passHref>
        <article className={`${styles.articleContainer} ${index%2>0?styles.odd:''}`}>
          <div className={styles.avatar}>
              <Image src={`/authors/${author.toLowerCase()}.png`} alt={`${author}-author-icon`} layout="fill" />
          </div>
            <header className={styles.copy}>
                <h2>{title}</h2>
                <time>{DateTime.fromFormat(date, 'MM/dd/yyyy').toLocaleString(DateTime.DATE_FULL)}</time>
                <div className={styles.author}>by {author}</div>
                {copy && <p>{copy.join(' ')}</p>}
            </header>
          <div className={styles.preview}>
            <Image src={`/preview/${preview}`} alt={preview} layout="fill" />
          </div>
        </article>
    </Link>
  )
}

export default Article