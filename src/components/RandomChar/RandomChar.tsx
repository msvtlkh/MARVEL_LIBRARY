import { getOneCharacterData } from '../../API/MarvelServices'
import styles from './RandomChar.module.scss'
import { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { NavLink } from 'react-router-dom'

interface characterInterface {
    name: string
    description: string
    img: string,
    loading?: boolean,
    id: number
}

export default function RandomChar() {
    const [ character, setCharacter ] = useState<characterInterface>(
        {
            name: '',
            description: '',
            img: '',
            loading: true,
            id: 0
        }
    )

    const handleClick = () => {
        setCharacter({
            ...character,
            loading: true
        })
        updateRandomCharacter()
    }

    const updateRandomCharacter = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        const maxLength = 243
        const data = await getOneCharacterData(id)
        const desc = data.data.results[0].description
        const trimmedText = desc.length > maxLength ? desc.slice(0, maxLength) + '...' : desc

        setCharacter({
            name: data.data.results[0].name,
            description: trimmedText,
            img: data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension,
            loading: false,
            id: data.data.results[0].id
        })
    }

    useEffect(() => {
        updateRandomCharacter()
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.first__block}>
               {character.loading ? <Spinner/> : <View img={character.img} name={character.name} description={character.description} id={character.id}/>}
            </div>

            <div className={styles.second__block}>
                <p className={styles.info}>
                Random character for today!<br/>
                Do you want to get to know him better?
                </p>

                <p className={`${styles.info} ${styles.last__info}`}>Or choose another one</p>
                <button className={styles.btn} onClick={handleClick}>try it</button>
            </div>
        </div>
    )
}

function View(props: characterInterface) {
    const { img, name, description, id } = props

    return(
        <>
        <img src={img} alt="hero" className={styles.img}/>

        <div className={styles.desc}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.text}>
                {description === '' ? 'no information' : description}
            </p>

            <div className={styles.wrapper}>
                <NavLink to='/' className={styles.btn}>homepage</NavLink>
                <NavLink to={`/${id}`} className={styles.btn}>wiki</NavLink>
            </div>
        </div>
        </>
    )
}