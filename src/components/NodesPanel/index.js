import React from 'react'

import PanelNode from '../PanelNode';
import { panelNodes } from '../../constants/reactFlow';
import './index.css'

const NodesPanel = () => (
    <ul className='panel-nodes-list'>
        {
            panelNodes.map((eachNode) => (
                <PanelNode key={eachNode.id} itemDetails={eachNode} />
            ))
        }
    </ul>
)

export default NodesPanel