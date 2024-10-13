import { FieldTimeOutlined, DatabaseOutlined, } from '@ant-design/icons';
import { Dropdown, } from 'antd';
import axios from 'axios';

function getTopicItem(label, key, hint) {
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

function getTopicControlOption(topic, handle_t) {
const protocorejs_api_addr = process.env.CORE_JS_WEB_ADDR || "http://localhost:50052";
const items = [
{
    key: 'database',
    label: (
    <a target="_blank" rel="noopener noreferrer" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const post_handle_t = {
            database: handle_t.database? false: true,
            real_time: handle_t.real_time
        };
        axios.post(`${protocorejs_api_addr}/menu/topics`, {topic: topic, handle_t: post_handle_t})
        .then(response => {})
        .catch(error => {});
        }}>
        Database
    </a>
    ),
    icon: handle_t?.database ? <DatabaseOutlined style={{ color: '#00CC00' }} /> : <DatabaseOutlined style={{ color: 'grey' }} />
}, 
{
    key: 'real-time',
    label: (
        <a target="_blank" rel="noopener noreferrer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const post_handle_t = {
                database: handle_t.database,
                real_time: handle_t.real_time? false: true
            };
            console.log(post_handle_t);
            axios.post(`${protocorejs_api_addr}/menu/topics`, {topic: topic, handle_t: post_handle_t})
            .then(response => {})
            .catch(error => {});
            }}>
            Real-Time
        </a>
    ),
    icon: handle_t?.real_time ? <FieldTimeOutlined style={{ color: '#00CC00' }} /> : <FieldTimeOutlined style={{ color: 'grey' }} />
},
];
return (
<>
<Dropdown menu={{items,}} placement="bottomRight">
<a onClick={(e) => {e.preventDefault(); e.stopPropagation()}}></a>
</Dropdown>
</>
)}

function TopicMenu(response_topics, setTopics) {
    setTopics([]);
    response_topics.forEach(({ topic, handle_t }) => {
    setTopics(prevTopics => [
            ...prevTopics,
            getTopicItem(topic, topic, getTopicControlOption(topic, handle_t))
        ])
    });
}

export default TopicMenu;
