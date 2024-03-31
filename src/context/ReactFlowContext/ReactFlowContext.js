import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { v4 } from "uuid";

export const ReactFlowContext = createContext({
    nodes: [],
    onNodesChange: () => { },
    edges: [],
    onEdgesChange: () => { },
    addNewNode: () => { },
    onConnect: () => { },
    onNodesDelete: () => { },
    onSave: () => { },
    setRfInstance: () => { },
    nodeDetails: [],
    updateNodeDetails: () => { }
})

const flowKey = 'react-flow';

const ReactFlowContextProvider = ({ children }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const [nodeDetails, setNodeDetails] = useState({})

    const navigate = useNavigate()

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes.map(each => ({ ...each, selected: false })) || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setNodes, setViewport]);

    useEffect(() => {
        onRestore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onUpdateNodeItems = (params) => {
        setNodes((nodes) => nodes.map(each => params.id === each.id ? { ...each, ...params } : each))
    }


    const addNewNode = ({ name }) => {
        const newNode = {
            id: v4(),
            position: {
                x: 300,
                y: 500,
            },
            data: { nodeType: name, message: "" },
            type: 'textNode',
        }
        setNodes((nodes) => [...nodes, newNode])

        navigate(`/settings/${name}`, { state: newNode })
    }

    const onConnect = useCallback(
        (params) => setEdges((eds) => {
            const target = params.target
            const isEdgeAlreadyExists = eds.find(each => each.target === target)

            if (isEdgeAlreadyExists)     // one node can have one source
                return eds

            return addEdge(params, eds)
        }),
        [setEdges],
    );

    const onNodesDelete = () => {
        navigate("/")
    }

    const onSave = (errorHandler) => {

        const noOfNodesNotConected = nodes.length - edges.length

        if (noOfNodesNotConected !== 1) // more than 1 target handle without source is not accepted
            errorHandler()

        else if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }

        else errorHandler()
    };

    const updateNodeDetails = (params) => {
        // batch update
        setNodeDetails(params)
        onUpdateNodeItems(params)
    }

    const values = {
        nodes,
        onNodesChange,
        edges,
        onEdgesChange,
        addNewNode,
        onConnect,
        onNodesDelete,
        onSave,
        setRfInstance,
        nodeDetails,
        updateNodeDetails
    }

    return (
        <ReactFlowContext.Provider value={values}>
            {children}
        </ReactFlowContext.Provider>
    )
}

export default ReactFlowContextProvider