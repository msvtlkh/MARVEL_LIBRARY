import Banner from '../../../../assets/Banner.png'
import styles from './CharCard.module.scss'
import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { getOneCharacterData } from '../../../../API/MarvelServices'
import Spinner from '../../../Spinner/Spinner'

interface CharacterInterface {
    title: string
    desc: string
    thumbnail: {
        path: string
        extension: string
    }
}

export default function CharCard () {
    const { id } = useParams()
    const [ character, setCharacter ] = useState<CharacterInterface | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    const updateCharacterInfo = async (id: number) => {
        const data = await getOneCharacterData(id)
        const result = data.data.results[0]

        setCharacter({
            title: result.name,
            desc: result.description,
            thumbnail: {
                path: result.thumbnail.path,
                extension: result.thumbnail.extension
            }
        })
    }

    useEffect(() => {
        const characterId = id ? Number(id) : null

        const fetchData = async() => {
            if(characterId !== null) {
                await updateCharacterInfo(characterId)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return(
        <div className={styles.container}>
            <img src={Banner} alt="Banner" />

            <div className={styles.wrapper}>
                { isLoading ? <Spinner/> : <View title={character?.title || 'Untitled'} desc={character?.desc || 'No description available'} thumbnail={character?.thumbnail || {path: '', extension: ''}}/>}
                
            </div>
        </div>
    )
}

function View (props: CharacterInterface) {
    const { title, desc, thumbnail } = props

    return(
        <>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="hero" className={styles.img}/>
                <div className={styles.info}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>
                        {desc}
                    </p>
                </div>
        </>
    )
}

