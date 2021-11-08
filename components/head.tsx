import styles from '../styles/Head.module.scss'

type Props = {
    title: string;
    subtitle?: string;
}

const Header:React.FC<Props> = ({title, subtitle}) => {
  return (
    <div className={styles.headBackground}>
      <h1>{title}</h1>
      {subtitle&&<small>{subtitle}</small>}
    </div>
  )
}

export default Header