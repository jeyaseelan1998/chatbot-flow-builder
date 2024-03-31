import React from 'react';
import { Link } from 'react-router-dom';
import { Handle, Position } from 'reactflow'
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import './index.css'
import { nodePanelItemName } from '../../constants/reactFlow';

const TextNode = (props) => {
    const { data: { nodeType, message = "sample" }, selected } = props

    const renderBodyOfNodeItem = () => {
        switch (nodeType) {
            case nodePanelItemName.message:
                return <p>{message}</p>

            default:
                return null
        }
    }

    return (
        <React.Fragment>
            <Handle type='target' position={Position.Left} />

            <Link to={`/settings/${nodeType}`} state={props} className='text-node-link'>
                <article className={`text-node ${selected ? "selected-node" : ""}`}>
                    <div className='node-header'>
                        <BiMessageRoundedDetail className='msg-icon' />
                        <p>Send message</p>
                        <div className='icon-container'>
                            <IoLogoWhatsapp className='whatsapp-icon' />
                        </div>
                    </div>

                    <div className='node-body'>
                        {renderBodyOfNodeItem()}
                    </div>
                </article>
            </Link>

            <Handle type='source' position={Position.Right} />
        </React.Fragment>
    )
}

export default TextNode