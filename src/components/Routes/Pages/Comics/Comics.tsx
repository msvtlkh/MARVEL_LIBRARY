import Banner from '../../../../assets/Banner.png'
import ComicsList from './ComicsList/ComicsList'

export default function Comics() {
    return(
        <div>
            <img src={Banner} alt="" className="banner" />
            <ComicsList/>
        </div>
    )
}