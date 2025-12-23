import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import { HouseModel } from './HouseModel';

interface SceneProps {
  floors: number;
  bedrooms: number;
  style: 'modern' | 'traditional' | 'minimalist';
  showRoof: boolean;
  autoRotate: boolean;
  selectedRoom: string | null;
  onRoomClick: (room: string) => void;
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#D4AF37" />
  </mesh>
);

export const Scene = ({
  floors,
  bedrooms,
  style,
  showRoof,
  autoRotate,
  selectedRoom,
  onRoomClick,
}: SceneProps) => {
  return (
    <Canvas
      camera={{ position: [10, 8, 10], fov: 50 }}
      shadows
      className="w-full h-full"
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#D4AF37" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* House Model */}
        <HouseModel
          floors={floors}
          bedrooms={bedrooms}
          style={style}
          showRoof={showRoof}
          selectedRoom={selectedRoom}
          onRoomClick={onRoomClick}
        />
        
        {/* Ground */}
        <ContactShadows
          position={[0, -1.7, 0]}
          opacity={0.5}
          scale={20}
          blur={2}
          far={10}
        />
        
        <Grid
          position={[0, -1.75, 0]}
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#3A2820"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#D4AF37"
          fadeDistance={30}
          fadeStrength={1}
          infiniteGrid
        />
        
        {/* Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enablePan={true}
          enableZoom={true}
          minDistance={5}
          maxDistance={25}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Suspense>
    </Canvas>
  );
};
