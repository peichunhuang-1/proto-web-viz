import React, {useRef} from 'react';
import * as THREE from 'three';

const Coordinate = ({position, length, rotation}) => {
    const Arrow = ({ direction, color, length = 1, position=[0, 0, 0]}) => {
    const ref = useRef();
    const rotatedDirection = direction.clone().applyQuaternion(rotation).applyQuaternion(
        new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2.0, 0, -Math.PI / 2.0))
    );
    return (
        <primitive
        object={
            new THREE.ArrowHelper(
            rotatedDirection.normalize(),
            new THREE.Vector3(position[1], position[2], position[0]),
            length,
            color,
            0.2 * length, 
            0.1 * length 
            )
        }
        ref={ref}
        />
    );
    };
  return (
    <>
    <Arrow direction={new THREE.Vector3(1, 0, 0)} color="red" length={length} position={position} />
    <Arrow direction={new THREE.Vector3(0, 1, 0)} color="green" length={length} position={position} />
    <Arrow direction={new THREE.Vector3(0, 0, 1)} color="blue" length={length} position={position} />
    </>
  );
};

export default Coordinate;