import { ControlOutlined } from '@ant-design/icons';

function ParamItem(key, label, icon) {
return {
    key,
    label: (
    <a target="_blank" rel="noopener noreferrer" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        }}>
        {label}
    </a>
    ),
    icon,
};
}

function getParamItem(params) {
    var items = []
    params.forEach((param) => {
        items.push(ParamItem(param.param, param.param, <ControlOutlined/>));
    });
    return items;
}

export default getParamItem;