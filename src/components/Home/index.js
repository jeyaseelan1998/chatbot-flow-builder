import ReactFlowPlayground from '../ReactFlowPlayground';
import Header from '../Header';
import SidePanel from '../SidePanel';

import './index.css'

const Home = () => (
    <div className="home-container">
        <Header />
        <div className='react-flow-side-panel-container'>
            <ReactFlowPlayground />
            <SidePanel />
        </div>
    </div>
)

export default Home;
