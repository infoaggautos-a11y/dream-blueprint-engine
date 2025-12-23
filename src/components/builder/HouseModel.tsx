import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface HouseModelProps {
  floors: number;
  bedrooms: number;
  style: 'modern' | 'traditional' | 'minimalist';
  showRoof: boolean;
  selectedRoom: string | null;
  onRoomClick: (room: string) => void;
}

const RoomBox = ({ 
  position, 
  size, 
  color, 
  name, 
  isSelected, 
  onClick 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color: string; 
  name: string; 
  isSelected: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered || isSelected ? 1.02 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={isSelected ? '#D4AF37' : hovered ? '#E6B54E' : color} 
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const Floor = ({ 
  yPosition, 
  selectedRoom, 
  onRoomClick,
  floorNumber 
}: { 
  yPosition: number; 
  selectedRoom: string | null;
  onRoomClick: (room: string) => void;
  floorNumber: number;
}) => {
  const rooms = [
    { name: `living_${floorNumber}`, position: [-1.5, yPosition, 0] as [number, number, number], size: [3, 2.5, 4] as [number, number, number], color: '#4A3528' },
    { name: `bedroom_${floorNumber}`, position: [1.8, yPosition, 1] as [number, number, number], size: [2.5, 2.5, 2] as [number, number, number], color: '#3A2820' },
    { name: `bathroom_${floorNumber}`, position: [1.8, yPosition, -1.2] as [number, number, number], size: [2.5, 2.5, 1.5] as [number, number, number], color: '#2D1810' },
  ];

  return (
    <group>
      {rooms.map((room) => (
        <RoomBox
          key={room.name}
          position={room.position}
          size={room.size}
          color={room.color}
          name={room.name}
          isSelected={selectedRoom === room.name}
          onClick={() => onRoomClick(room.name)}
        />
      ))}
      {/* Floor plate */}
      <mesh position={[0, yPosition - 1.3, 0]}>
        <boxGeometry args={[7, 0.1, 5]} />
        <meshStandardMaterial color="#1A0F0A" />
      </mesh>
    </group>
  );
};

const Roof = ({ yPosition, style }: { yPosition: number; style: string }) => {
  if (style === 'modern' || style === 'minimalist') {
    return (
      <mesh position={[0, yPosition + 0.2, 0]}>
        <boxGeometry args={[7.5, 0.3, 5.5]} />
        <meshStandardMaterial color="#2D1810" />
      </mesh>
    );
  }

  return (
    <mesh position={[0, yPosition + 1, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[5, 2, 4]} />
      <meshStandardMaterial color="#CD7F32" />
    </mesh>
  );
};

export const HouseModel = ({ 
  floors, 
  bedrooms, 
  style, 
  showRoof,
  selectedRoom,
  onRoomClick 
}: HouseModelProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const floorHeight = 2.6;
  const floorPositions = Array.from({ length: floors }, (_, i) => i * floorHeight);

  return (
    <group ref={groupRef}>
      {/* Foundation */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.5, 6]} />
        <meshStandardMaterial color="#1A0F0A" />
      </mesh>

      {/* Floors */}
      {floorPositions.map((yPos, index) => (
        <Floor 
          key={index} 
          yPosition={yPos} 
          selectedRoom={selectedRoom}
          onRoomClick={onRoomClick}
          floorNumber={index + 1}
        />
      ))}

      {/* Roof */}
      {showRoof && (
        <Roof yPosition={floorPositions[floors - 1] + 1.3} style={style} />
      )}

      {/* Windows - Gold accents */}
      {floorPositions.map((yPos, floorIdx) => (
        <group key={`windows_${floorIdx}`}>
          <mesh position={[-3, yPos, 0]}>
            <boxGeometry args={[0.1, 1.2, 1.5]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[3.1, yPos, 0.5]}>
            <boxGeometry args={[0.1, 0.8, 0.8]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Door */}
      <mesh position={[-3, -0.5, 1.5]}>
        <boxGeometry args={[0.15, 2, 1]} />
        <meshStandardMaterial color="#CD7F32" />
      </mesh>
    </group>
  );
};
