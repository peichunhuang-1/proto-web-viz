import getParamItem from './ParamMenu'
import getServiceItem from './ServiceMenu'
import { Dropdown, } from 'antd';

function merge(arr_1, arr_2) {
const items = [...arr_1, ...arr_2];

return (
<Dropdown menu={{items,}} placement="bottomRight">
<a onClick={(e) => {e.preventDefault(); e.stopPropagation()}}></a>
</Dropdown>
)}

function getNodeItem(label, key, hint) {
return {
    key,
    label: (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <span>{label}</span>
        {hint}
    </div>
    ),
};
}

function NodeMenu(response_nodes, setNodes) {
    setNodes([]);
    response_nodes.forEach(({ node, services, params }) => {
        console.log(node);
        setNodes(prevNodes => [
            ...prevNodes,
            getNodeItem(node, node, merge(getParamItem(params), getServiceItem(services)))
        ])
    });
}

export default NodeMenu;