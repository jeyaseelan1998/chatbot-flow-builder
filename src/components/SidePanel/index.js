import { Routes, Route } from 'react-router-dom'

import NodesPanel from '../NodesPanel'
import SettingsPanel from '../SettingsPanel'
import './index.css'

const SidePanel = () => {

    return (
        <section className='panel-section'>
            <Routes>
                <Route index element={<NodesPanel />} />
                <Route path='/settings/:nodeId' element={<SettingsPanel />} />
            </Routes>
        </section>
    )
}

export default SidePanel