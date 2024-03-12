import './styles.css'
import { updateProjectDOM, resetAllActives} from './domhandler.js'
import { renderEventListeners } from './logic.js'




function startApp() {
    resetAllActives()
    renderEventListeners()
    updateProjectDOM()
}

startApp()

