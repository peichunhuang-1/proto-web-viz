import React from 'react';
import Coordinate from './Coordinate';

const Transform = ({transforms}) => {
    return (
    <>
        {transforms.map((transform, index) =>(
        <Coordinate
            key={index}
            position={transform.position}
            length={0.4}
            rotation={transform.rotation}
        />
        ))}
    </>
    );
}

export default Transform;