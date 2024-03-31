import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './index.css'
import { IoMdArrowBack } from "react-icons/io";
import { useContext, useEffect } from 'react';
import { ReactFlowContext } from '../../context/ReactFlowContext/ReactFlowContext';

const SettingsPanel = () => {
    const { nodeId } = useParams()
    const { nodes, updateNodeDetails, nodeDetails } = useContext(ReactFlowContext)
    const navigate = useNavigate()

    const { state } = useLocation()

    useEffect(() => {
        updateNodeDetails({
            id: state.id,
            data: { nodeType: state.data.nodeType, message: state.data.message },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodeId, state])

    useEffect(() => {
        if (!nodes.length) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeInput = e => {
        updateNodeDetails({
            id: state.id,
            data: { nodeType: state.data.nodeType, message: e.target.value },
        })
    }

    const constRenderFormFields = () => {
        switch (nodeId) {
            case "Message":
                return (
                    <form className='settings-form'>
                        <label>Text</label>
                        <textarea
                            rows={6}
                            className='msg-input'
                            value={nodeDetails?.data?.message}
                            onChange={onChangeInput}
                            placeholder='Type here'
                        />
                    </form>
                )
            default:
                return null
        }
    }

    return (
        <section>
            <div className='settings-header'>
                <Link to="/">
                    <button type='button' className='back-btn'>
                        <IoMdArrowBack className='back-arrow-icon' />
                    </button>
                </Link>
                <p>
                    Message
                </p>
            </div>

            {constRenderFormFields()}
        </section>
    )
}

export default SettingsPanel