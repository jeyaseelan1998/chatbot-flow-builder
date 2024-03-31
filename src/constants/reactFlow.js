import { MarkerType } from "reactflow";
import TextNode from "../components/TextNode";

export const defaultEdges = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
    }
}

// Register all the custom nodes here
export const nodeTypes = { textNode: TextNode }

export const panelNodes = [
    {
        id: "message",
        name: "Message"
    }
]

// use name property of object of panelNodes array
export const nodePanelItemName = {
    message: "Message"
}