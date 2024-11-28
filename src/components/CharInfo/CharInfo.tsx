import styles from './CharInfo.module.scss'
import { useContext, useEffect, useState } from 'react'
import { CharInfoContext } from '../../context/CharInfoContext'
import { getOneCharacterData } from '../../API/MarvelServices'
import CharInfoSkeleton from '../Skeleton/Skeleton'
import Spinner from '../Spinner/Spinner'
import { NavLink } from 'react-router-dom'

interface CharacterInterface {
    name: string
    thumbnail: {
        extension: string
        path: string
    }
    description: string
    stories: [
        {
            name: string
        }
    ]
    id: number
}

export default function CharInfo() {
    const [ character, setCharacter ] = useState<CharacterInterface | null>(null)
    const [ initialLoading, setInitialLoading ] = useState(true)
    const context = useContext(CharInfoContext)
    const characterLength = (character?.name || '').length

    const updateInfoCharacter = async (id: number) => {
        const data = await getOneCharacterData(id)
        const result = data.data.results[0]
        const splitedComics = result.comics.items

        if(result){
            setCharacter(
                {
                    name: result.name,
                    thumbnail: {
                        extension: result.thumbnail.extension,
                        path: result.thumbnail.path
                    },
                    description: result.description,
                    stories: splitedComics.slice(0, 10),
                    id: result.id
                }
    
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if(context?.charState.charId) {
              setInitialLoading(false)
              await updateInfoCharacter(context?.charState.charId)
              context.setCharState({ ...context.charState, loading: false })
            }
        }
        fetchData()
    }, [context?.charState.charId])

    if(initialLoading) return <CharInfoSkeleton/>

    if(context?.charState.loading) return <Spinner/>

    const storiesList = character?.stories.map(item => 
        <li className={styles.item} key={crypto.randomUUID()}>{item.name}</li>
    )

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={character?.thumbnail.path + '.' + character?.thumbnail.extension} alt="hero photo" className={styles.img} />
                <div className={styles.content}>
                    <div className={characterLength < 17 ? styles.name__one : styles.name__two}>{character?.name}</div>
                    <NavLink to='/' className={styles.btn}>HOMEPAGE</NavLink>
                    <NavLink to={`/${character?.id}`} className={styles.btn}>WIKI</NavLink>
                </div>
            </div>

            <div className={styles.desc}>
                {character?.description ? character.description : 'no information'}
            </div>

            <div className={styles.list__wrapper}>
                <div className={styles.title}>Comics:</div>
                <ul className={styles.list}>
                    {storiesList?.length ? storiesList : 'no information'}
                </ul>
            </div>
        </div>
    )
}
