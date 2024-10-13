import { notification } from 'antd';

const openNotification = (message, description) => {
    notification.open({
        message: message,
        description: description,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export default openNotification;