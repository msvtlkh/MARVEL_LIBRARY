import Skeleton from '@mui/material/Skeleton'
import styles from './Skeleton.module.scss'

export default function CharInfoSkeleton() {
    return(
        <div className={styles.container}>
            <h3 className={styles.title}> Please select a character to see information </h3>

            <div className={styles.header}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1rem'}} width={320} height={30}/>
            </div>

            <Skeleton variant="text" sx={{ fontSize: '1rem'}}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem'}}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem'}}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem'}}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem'}}/>
        </div>
    )
}