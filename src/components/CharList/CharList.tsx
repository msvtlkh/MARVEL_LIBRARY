import styles from './CharList.module.scss'
import { getAllCharactersData } from '../../API/MarvelServices'
import { useContext, useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { CharInfoContext } from '../../context/CharInfoContext'

interface CharacterInterface {
    name: string
    id: number
    thumbnail: {
        path: string
        extension: string
    }
}

export default function CharList() {
    const context = useContext(CharInfoContext)
    const [ isClicked, setIsClicked ] = useState<boolean>(false)
    const [ offset, setOffset ] = useState(210)
    const [ characters, setCharacters ] = useState<CharacterInterface[]>([])

    const updateListCharacter = async (offset: number) => {
        const data = await getAllCharactersData(offset)
        const result = data.data.results

        const newData = result.map((character:CharacterInterface) => ({
            name: character.name,
            id: character.id,
            thumbnail: {
                path: character.thumbnail.path,
                extension: character.thumbnail.extension
            }

        }))
        setCharacters((prevCharacters) => [...prevCharacters, ...newData])
    }

    useEffect(() => {
        const fetchData = async () => {
            await updateListCharacter(offset) 
            setIsClicked(false)
        }
        fetchData()
    }, [offset])

    const handleShowMore = () => {
        setIsClicked(true)
        setOffset((prev) => prev + 9)
    }

    const handleCardClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const charId = event.currentTarget.getAttribute('id')

        if(charId && context) {
            context.setCharState({ charId: +charId, loading: true })
        }
    }

    if(characters.length === 1) {
        return <Spinner/>
    }

    const listItems = characters.map(character => 
        <li className={styles.card} key={crypto.randomUUID()} id={`${character.id}`} onClick={handleCardClick}>
            <img src={character.thumbnail.path + '.' + character.thumbnail.extension} alt="hero photo" className={styles.photo}/>

            <div className={styles.desc}>
                <h3 className={styles.title}>{character.name}</h3>
            </div>
        </li>
    )
    
    return(
        <div className={styles.container}>
            <ul className={styles.list}>
                {listItems}
            </ul>
            <button className={styles.btn} onClick={handleShowMore} disabled={isClicked}>Load More</button>
        </div>
    )
}