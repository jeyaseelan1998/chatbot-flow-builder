import React, { useContext } from 'react';
import ReactFlow, {
    Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd'

import { ReactFlowContext } from '../../context/ReactFlowContext/ReactFlowContext';
import { defaultEdges, nodeTypes } from '../../constants/reactFlow'
import { itemTypes } from '../../constants/dragAndDrop';
import './index.css'

const ReactFlowPlayground = () => {
    const { nodes,
        onNodesChange,
        edges,
        onEdgesChange,
        addNewNode,
        onConnect,
        onNodesDelete,
        setRfInstance
    } = useContext(ReactFlowContext)

    const [, drop] = useDrop(() => ({
        accept: itemTypes.messageNode,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop: addNewNode
    }))

    return (
        <div className='body-container' ref={drop}>
            <ReactFlow
                nodeTypes={nodeTypes}   // custom nodes registration 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onNodesDelete={onNodesDelete}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={defaultEdges}
                onInit={setRfInstance}
            >
                <Background color='#fff' />
            </ReactFlow>
        </div>
    );
}

export default ReactFlowPlayground