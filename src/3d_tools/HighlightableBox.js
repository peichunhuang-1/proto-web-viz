import { useRef, useEffect } from 'react';
import { Box, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const HighlightableBox = ({name, position, args, rotation, onClick, isHighlighted, label, label_position, label_rotation }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.name = name; // Set the name of the mesh
    }
  }, [name]);
  // Use the useFrame hook to update the highlighted state
  useFrame(() => {
    if (ref.current) {
        ref.current.material.color.set(isHighlighted ? "#f1f1f1" : '#d1d1d1');
    }
  });

  return (
    <group>
    <Box
      ref={ref}
      position={position}
      args={args}
      rotation={rotation}
      onClick={onClick}
    >
      <meshStandardMaterial roughness={0.5}/>
    </Box>
    {label && label_position && label_rotation && (
    <Text
        position={label_position} // Adjust the position to place the text properly
        rotation={label_rotation}
        fontSize={0.4}
        color="#111111"
        anchorX="center"
        anchorY="middle"
    >
        {label}
    </Text>
    )}
    </group>
  );
};

export default HighlightableBox;
