import { BiMessageRoundedDetail } from "react-icons/bi";
import { useDrag } from 'react-dnd'

import { itemTypes } from "../../constants/dragAndDrop";
import { nodePanelItemName } from "../../constants/reactFlow";
import './index.css'

const PanelNode = ({ itemDetails: { id, name } }) => {
    const [, drag] = useDrag(() => ({
        type: itemTypes.messageNode,
        item: { id, name }, // this info shared to droping target
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const renderIcon = () => {
        switch (name) {
            case nodePanelItemName.message:
                return <BiMessageRoundedDetail className='msg-icon' />
            default:
                return null
        }
    }

    return (
        <li ref={drag}>
            {renderIcon()}
            <p className='panel-node-name'>{name}</p>
        </li>
    )
}

export default PanelNode