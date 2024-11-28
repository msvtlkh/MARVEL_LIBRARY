import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './components/Routes/Router'

createRoot(document.getElementById('root')!).render(
    <CssBaseline>
        <AppProvider/> 
    </CssBaseline>
)
