import Banner from '../../../../assets/Banner.png'
import styles from './ComicsCard.module.scss'
import hero from '../../../../assets/x-men.png'
import { NavLink, useParams } from 'react-router-dom'
import { getOneComicsData } from '../../../../API/MarvelServices'
import { useEffect, useState } from 'react'
import Spinner from '../../../Spinner/Spinner'

interface ComicsInterface {
    title: string
    desc: string
    totalPages: number
    price: number
    thumbnail: {
        path: string
        extension: string
    }
}

export default function ComicsCard () {
    const { id } = useParams()
    const [ comics, setComics ] = useState<ComicsInterface>(
        {
            title: 'Untitled',
            desc: 'No description availabe',
            totalPages: 0,
            price: 0,
            thumbnail: {
                path: '',
                extension: ''
            }
        }
    )
    const [ isLoading, setIsLoading ] = useState(true)

    const updateComicsData = async (id: number) => {
        const data = await getOneComicsData(id)
        const result = data.data.results[0]

        setComics({
            title: result.title,
            desc: result.variantDescription,
            totalPages: result.pageCount,
            price: result.prices[0].price,
            thumbnail: {
                path: result.thumbnail.path,
                extension: result.thumbnail.extension
            }
        })
    }

    useEffect(() => {
        const comicsId = id ? Number(id) : null

        const fetchData = async() => {
            if(comicsId !== null) {
                await updateComicsData(comicsId)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return(
        <div className={styles.container}>
            <img src={Banner} alt="Banner" />

            <div className={styles.wrapper}>
               { isLoading ? <Spinner/> : <View title={comics.title || 'Untitled'} desc={comics.desc || 'No description availabe'} totalPages={comics.totalPages || 0} price={comics.price || 0} thumbnail={comics.thumbnail || {path: '', extension: ''}}/> }
            </div>
        </div>
    )
}

function View (props: ComicsInterface) {
    const { title, desc, totalPages, price, thumbnail } = props

    return (
        <>
             <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="hero" className={styles.img}/>
                <div className={styles.info}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>
                        {desc}
                    </p>
                    <p className={styles.pages}>{totalPages} pages</p>
                    <p className={styles.lang}>Language: en-us</p>
                    <p className={styles.price}>{price}$</p>
                </div>

                <NavLink to='/comics' className={styles.btn}>Back to all</NavLink>
        </>
    )
}