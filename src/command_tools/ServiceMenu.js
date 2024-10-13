import { ApiOutlined } from '@ant-design/icons';

function ServiceItem(key, label, icon) {
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
    icon
};
}

function getServiceItem(services) {
    var items = []
    services.forEach((service) => {
        items.push(ServiceItem(service.service, service.service, <ApiOutlined/>));
    });
    return items;
}

export default getServiceItem;