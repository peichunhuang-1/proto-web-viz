import React from 'react';
import { Points, PointMaterial } from '@react-three/drei';


const PointCloud = ({ points }) => {
  const allPositions = [];
  const allColors = [];
  
  points.forEach(pointData => {
    for (let i = 0; i < pointData.positions.length; i += 3) {
        allPositions.push(pointData.positions[i + 1], pointData.positions[i + 2], pointData.positions[i]);
    }
    allColors.push(...(pointData.colors?.length > 0 &&  pointData.colors?.length === pointData.positions.length? pointData.colors : new Array(pointData.positions.flat().length).fill(0.05)));
  });
  
  const positions = new Float32Array(allPositions.flat());
  const colors = new Float32Array(allColors.flat());
  return (
    <Points positions={positions} colors={colors}>
      <PointMaterial size={0.05} vertexColors transparent />
    </Points>
  );
};

export default PointCloud;