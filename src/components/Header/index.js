import { useContext, useEffect, useRef, useState } from 'react'
import Popub from '../Popup'
import { ReactFlowContext } from '../../context/ReactFlowContext/ReactFlowContext'
import './index.css'

const Header = () => {
    const [error, setError] = useState(false)
    const timerId = useRef(null);

    const { onSave } = useContext(ReactFlowContext);

    const closePopup = () => {
        setError(() => false)
    }

    const startTimer = (time = 3000) => {
        if (timerId.current !== null)
            clearTimeout(timerId.current)

        timerId.current = setTimeout(closePopup, time)
    }

    const showPopup = () => {
        setError(() => true)
        startTimer()
    }

    const onHandleSave = () => {
        onSave(showPopup)
    }

    return (
        <header className='header-container'>
            <nav className='nav-bar'>
                <button className='save-changes-btn' onClick={onHandleSave}>
                    Save Changes
                </button>
            </nav>

            {error && <Popub>
                <p>Can not save Flow</p>
            </Popub>}
        </header>
    )
}

export default Header