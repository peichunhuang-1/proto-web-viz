import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import CameraController from './CameraController';
import * as THREE from 'three';

import Coordinate from './Coordinate';
import PointCloud from './PointCloud';
import Transform from './Transform';

const ThreeDScene = () => {
  const cameraControlsRef = useRef();
  const controlBoxRef = useRef();

  // const [pointcloud, setPointcloud] = useState([{positions:[
  //   1, 0, 0,
  //   0, 1, 0,
  //   0, 0, 1
  // ], colors:[
  //   1, 0, 0, 
  //   0, 1, 0, 
  //   0, 0, 1]}, 
  // ]);
  // const [transforms, setTransforms] = useState([{
  //   position:[1, 2, 1],
  //   rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI/2, 0, 0))
  // }]);
  
  const [pointcloud, setPointcloud] = useState([]);
  const [transforms, setTransforms] = useState([]);

  return (
    <>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '10vh', 
    display: 'flex', alignItems: 'center', paddingLeft: '10px', background: 'rgba(0, 0, 0, 0)', zIndex: 2}}>
    <Button
      type="default"
      icon={<HomeOutlined />}
      style={{top: 0, left: 0, background: 'transparent', border:'none', boxShadow: 'none'}}
      onClick={() => {
        cameraControlsRef.current?.reset(true);
      }}
    />
    <Canvas style={{ height: '20vh', width: '20vh', position: 'absolute', top: 0, right: 0}} shadows={true}>
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[2, 3, 4]} 
        intensity={1} 
        castShadow={true}
      />
      <CameraControls
        ref={controlBoxRef}
        maxDistance={5} 
        minDistance={5}
      />
      <CameraController cameraControlsRef={cameraControlsRef}/>
    </Canvas>
    </div>

    <Canvas
      style={{ height: '72vh', background: 'rgba(0, 0, 0, 0)', zIndex: 1}}
    >
      <CameraControls
        ref={cameraControlsRef}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 10]} />
      <gridHelper args={[30, 30, 0x2C2C2C, 0x888888]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Coordinate position={[0, 0, 0]} rotation={new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))}/>
      <PointCloud points={pointcloud} />
      <Transform transforms={transforms} />
    </Canvas>
    </>
  );
};

export default ThreeDScene;
