import CharInfoProvider from '../../../../context/CharInfoContext'
import CharInfo from '../../../CharInfo/CharInfo'
import CharList from '../../../CharList/CharList'
import RandomChar from '../../../RandomChar/RandomChar'
import styles from './App.module.scss'

function App() {
  return (
    <div>
      <main className={styles.main}>
        <CharInfoProvider>
          <RandomChar/>
          <div className={styles.wrapper}>
            <CharList/>
            <CharInfo/>
          </div>
        </CharInfoProvider>
      </main>
    </div>
  )
}

export default App
