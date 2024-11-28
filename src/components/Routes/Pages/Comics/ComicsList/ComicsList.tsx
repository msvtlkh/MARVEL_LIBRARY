import styles from './ComicsList.module.scss'
import { useEffect, useState } from 'react'
import { getAllComicsData } from '../../../../../API/MarvelServices'
import Spinner from '../../../../Spinner/Spinner'
import { NavLink } from 'react-router-dom'

interface ComicsInterface {
    title: string
    prices: { price: number }[]
    id: number
    thumbnail: {
        path: string
        extension: string
    }
    price?: number | string
}

export default function ComicsList() {
    const [ comics, setComics ] = useState<ComicsInterface[]>()
    const [ comicsLimit, setComicsLimit] = useState<number>(8)
    const [ isClicked, setIsClicked ] = useState<boolean>(false)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    const updateComicsList = async () => {
        const data = await getAllComicsData(comicsLimit)
        const results = data.data.results

        const newData = results.map((comics:ComicsInterface) => ({
            title: comics.title,
            price: comics.prices.length < 0 || comics.prices[0].price === 0 ? 'NOT AVAILABLE' : `${comics.prices[0].price}$`,
            id: comics.id,
            thumbnail: {
                path: comics.thumbnail.path,
                extension: comics.thumbnail.extension
            }
        }))

        setComics(newData)
    }

    useEffect(() => {
        const fetchData = async () => {
            await updateComicsList()
            setIsLoading(false)
            setIsClicked(false)
        }
        fetchData()
    }, [comicsLimit])

    const handleShowMore = () => {
        setComicsLimit((prev) => prev + 8)
        setIsClicked(true)
    }

    const ListItem = comics?.map(comics => 
        <li className={styles.card} key={crypto.randomUUID()}>
            <NavLink to={`/comics/${comics.id}`}>
            <img src={comics.thumbnail.path + '.' + comics.thumbnail.extension} alt="hero photo" className={styles.photo}/>
            <h3 className={styles.title}>{comics.title}</h3>
            <p className={styles.price}>{comics.price}</p>
            </NavLink>
        </li> 
    )

    return(
        <div className={styles.container}>
            { isLoading ? <Spinner/> : <><ul className={styles.list}> { ListItem}</ul> <button className={styles.btn} onClick={handleShowMore} disabled={isClicked}>Load More</button></>}
        </div>
    )
}