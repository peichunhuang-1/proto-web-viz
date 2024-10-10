import React, { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import HighlightableBox from './HighlightableBox';
import * as THREE from 'three';
const CameraController = ({cameraControlsRef}) => {
  const mouse = useRef(new THREE.Vector2());
  const {camera, scene, gl} = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  useEffect(() => {
    const handlePointerMove = (event) => {
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Normalize mouse coordinates based on canvas size
    mouse.current.x = ((event.clientX - rect.left) / canvasWidth) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / canvasHeight) * 2 + 1;
    };
    gl.domElement.addEventListener('pointermove', handlePointerMove);

    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl.domElement]);
  

  const [intersectedObject, setIntersectedObject] = useState(null);

  const updateRaycaster = () => {
    // Raycaster logic to detect intersections
    raycaster.current.setFromCamera( mouse.current, camera );
    const intersects = raycaster.current.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const objectName = intersects[0].object.name;
        setIntersectedObject(objectName);
      } else {
        setIntersectedObject(null);
      }
  };

  useFrame(() => {
    updateRaycaster();
  });

  const handleClick = () => {
    if (intersectedObject) {
        if (cameraControlsRef?.current &&  scene.getObjectByName(intersectedObject)) {
        cameraControlsRef.current.setTarget(0, 0, 0); // Set the target to the center
        const position = scene.getObjectByName(intersectedObject).position;
        cameraControlsRef.current.setPosition( position.x * 10 , position.y * 10, position.z * 10); // Update the camera position to the selected box
        cameraControlsRef.current.rotate(0, 0, true);
        cameraControlsRef.current.update();
        }
    }
  };

  return (
    <group>
      {/* Create corners */}
      {[
        [0.8, 0.8, 0.8], [0.8, 0.8, -0.8], [0.8, -0.8, 0.8], [0.8, -0.8, -0.8],
        [-0.8, 0.8, 0.8], [-0.8, 0.8, -0.8], [-0.8, -0.8, 0.8], [-0.8, -0.8, -0.8]
      ].map((pos, index) => (
        <HighlightableBox
          key={`corner-${index}`}
          name={`corner-${index}`}
          position={pos}
          args={[0.4, 0.4, 0.4]}
          onClick={() => handleClick()}
          isHighlighted={intersectedObject === `corner-${index}`}
        />
      ))}

      {/* Create edges */}
      {[
        { position: [0.8, 0.8, 0.0], rotation: [0, 0, 0] },
        { position: [0.8, -0.8, 0.0], rotation: [0, 0, 0] },
        { position: [0.8, 0.0, 0.8], rotation: [Math.PI / 2, 0, 0] },
        { position: [0.8, 0.0, -0.8], rotation: [Math.PI / 2, 0, 0] },
        { position: [0.0, 0.8, 0.8], rotation: [0, Math.PI / 2, 0] },
        { position: [0.0, 0.8, -0.8], rotation: [0, Math.PI / 2, 0] },
        { position: [-0.8, 0.8, 0.0], rotation: [0, 0, 0] },
        { position: [-0.8, -0.8, 0.0], rotation: [0, 0, 0] },
        { position: [-0.8, 0.0, 0.8], rotation: [Math.PI / 2, 0, 0] },
        { position: [-0.8, 0.0, -0.8], rotation: [Math.PI / 2, 0, 0] },
        { position: [0.0, -0.8, 0.8], rotation: [0, Math.PI / 2, 0] },
        { position: [0.0, -0.8, -0.8], rotation: [0, Math.PI / 2, 0] }
      ].map((edge, index) => (
        <HighlightableBox
          key={`edge-${index}`}
          name={`edge-${index}`}
          position={edge.position}
          rotation={edge.rotation}
          args={[0.4, 0.4, 1.2]}
          onClick={() => handleClick()}
          isHighlighted={intersectedObject === `edge-${index}`}
        />
      ))}

      {/* Create faces */}
      {[
        { position: [0.0, 0.0, 0.8], rotation: [0, 0, 0], label_position: [0.0, 0.0, 1.1], label_rotation: [0, 0, 0],  label:'FRONT'},
        { position: [0.0, 0.0, -0.8], rotation: [0, 0, 0], label_position: [0.0, 0.0, -1.1], label_rotation: [-Math.PI, 0, Math.PI],  label:'BACK' },
        { position: [0.0, 0.8, 0.0], rotation: [Math.PI / 2, 0, 0], label_position: [0.0, 1.1, 0], label_rotation: [-Math.PI / 2, 0, 0],  label:'TOP' },
        { position: [0.0, -0.8, 0.0], rotation: [Math.PI / 2, 0, 0], label_position: [0.0, -1.1, 0.0], label_rotation: [Math.PI / 2, 0, 0],  label:'UNDER' },
        { position: [0.8, 0.0, 0.0], rotation: [0, Math.PI / 2, 0], label_position: [1.1, 0.0, 0], label_rotation: [0, Math.PI / 2, 0],  label:'RIGHT' },
        { position: [-0.8, 0.0, 0.0], rotation: [0, Math.PI / 2, 0], label_position: [-1.1, 0.0, 0.0], label_rotation: [0, -Math.PI / 2, 0],  label:'LEFT' }
      ].map((face, index) => (
        <HighlightableBox
          key={`face-${index}`}
          name={`face-${index}`}
          position={face.position}
          rotation={face.rotation}
          args={[1.2, 1.2, 0.4]}
          onClick={() => handleClick()}
          isHighlighted={intersectedObject === `face-${index}`}
          label={`${face.label}`}
          label_position={face.label_position}
          label_rotation={face.label_rotation}
        />
      ))}
    </group>
  );
};

export default CameraController;
