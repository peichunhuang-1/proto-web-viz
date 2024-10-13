import React, { useState, useEffect } from 'react';
import {
MessageOutlined,
UserOutlined,
ReloadOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import axios from 'axios';
import TopicMenu from './TopicMenu'
import NodeMenu from './NodeMenu'

function getBasicItem(label, key, icon, children) {
return {
    key,
    icon,
    children,
    label
};
}

const MainMenuList  = () => {
    const protocorejs_api_addr = process.env.CORE_JS_WEB_ADDR || "http://localhost:50052";
    const [nodes, setNodes] = useState([]);
    const [topics, setTopics] = useState([]);
    const [count, setCount] = useState(0);
    const fetchData = () => {
        axios.post(`${protocorejs_api_addr}/menu`, { count: count })
        .then(response => {
        if (response.data.count !== count) {
            NodeMenu(response.data.nodes, setNodes);
            TopicMenu(response.data.topics, setTopics);
            setCount(response.data.count);
        }
        })
        .catch(error => {
        console.log(error);
        });

    };

    useEffect(() => {
    const intervalId = setInterval(() => {
        fetchData();
    }, 2000);
    return () => clearInterval(intervalId);
    }, [count]);
    
    const items = [
        getBasicItem('Nodes', 'node', <UserOutlined />, nodes),
        getBasicItem('Topics', 'topic', <MessageOutlined />, topics),
    ];

    return (
    <>
        <Button type="default" icon={<ReloadOutlined />} size={'small'} onClick={fetchData}/>
        <Menu theme="dark" mode="inline" items={items} />
    </>
    )
}

export default MainMenuList;