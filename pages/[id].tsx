import Image from 'next/image'
import { DateTime } from 'luxon'
import styles from '../styles/ArticlePage.module.scss'
import { getAllPostIds, getPostData, Post } from './api/apis'

type Props = {
  postData: Post
}
const regex = /([^{]*){([0-9])}([^{]*)/g;

const ArticlePage: React.FC<Props> = ({ postData }) => {
  return (
    <div className={styles.generalBackground}>
    <main className={styles.articleContainer}>
      <header className={styles.articleHeadBackground}>
        <div className={styles.avatar}>
            <Image src={`/authors/${postData.author.toLowerCase()}.png`} alt={`${postData.author}-author-icon`} layout="fill" />
        </div>
        <div className={styles.info}>
                <h2>{postData.title}</h2>
                <time>{DateTime.fromFormat(postData.date, 'MM/dd/yyyy').toLocaleString(DateTime.DATE_FULL)}</time>
                <div className={styles.author}>by {postData.author}</div>
        </div>
      </header>
      {postData.image && <Image className={styles.hero} src={`/images/${postData.image}.jpeg`} />}
      {postData.video && <iframe className={styles.hero} src={postData.video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
    {postData.copy.map((copy, index)=>{
      if (postData.links && copy.includes('{')) {
        let sliced = regex.exec(copy);
        console.log(sliced, copy)
        if(sliced && sliced.length > 0) {
          const linkIndex = parseInt(sliced[2], 10);
          return <p key={index}>{sliced[1]}<a href={postData.links[linkIndex].url} className={styles.link}>{postData.links[linkIndex].text}</a>{sliced[3]}</p>
        }
      } 
      return <p key={index}>{copy}</p>
    })}
    </main>
    </div>
  )
}
export default ArticlePage


export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }:{params:{id:string}}) {
  console.log({params})
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}