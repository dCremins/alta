
import Head from 'next/head'
import Header from '../components/head'
import { getPosts, Post } from './api/apis'
import styles from '../styles/News.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'
import Foot from '../components/foot'
type Props = {
  allPosts: Post[];
}

const Home:React.FC<Props> = ({allPosts, ...rest}) => {
  return (
    <div className={styles.newsBackground}>
      <Head>
          <title>Tales of The Township | Latest News, Articles, Dev Blogs About A Township Tale</title>
          <meta name="description" content="Get the latest A Township Tale news about updates, community events, patch notes and more. The best source of information on A Township Tale"></meta>
      </Head>
      <Nav />
      <div className={styles.newsContainer}>
        <main className={styles.newsList}>
        <Header title="Tales of the Township" subtitle="UPDATES, NEWS AND DEV BLOGS" />
          {allPosts.map((post, index)=><Article key={post.id} index={index} {...post} />)}
        </main>
      </div>
      <Foot />
    </div>  
  )
}

export default Home

export async function getStaticProps() {
  const allPosts = getPosts()

  return {
    props: { allPosts },
  }
}