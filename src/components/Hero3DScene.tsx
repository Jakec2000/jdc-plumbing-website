import { ContactShadows, Float, Html } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

const METAL = '#9ba7b2';
const DARK_METAL = '#44515f';
const BRASS = '#b89b63';
const WATER = '#6fc7e8';

function Tube({ points, radius = 0.16, material = 'metal' }: { points: THREE.Vector3[]; radius?: number; material?: 'metal' | 'brass' }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.12);
    return new THREE.TubeGeometry(curve, 48, radius, 10, false);
  }, [points, radius]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={material === 'brass' ? BRASS : METAL} metalness={0.88} roughness={material === 'brass' ? 0.24 : 0.18} envMapIntensity={1.2} />
    </mesh>
  );
}

function Coupler({ position, rotation = [0, 0, 0], brass = false }: { position: [number, number, number]; rotation?: [number, number, number]; brass?: boolean }) {
  return <mesh position={position} rotation={rotation} castShadow><cylinderGeometry args={[0.245, 0.245, 0.42, 20]} /><meshStandardMaterial color={brass ? BRASS : DARK_METAL} metalness={0.9} roughness={0.2} /></mesh>;
}

function Valve({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow><cylinderGeometry args={[0.28, 0.28, 0.5, 20]} /><meshStandardMaterial color={BRASS} metalness={0.92} roughness={0.2} /></mesh>
      <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.36, 12]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.22} /></mesh>
      <mesh position={[0, 0.61, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><torusGeometry args={[0.34, 0.055, 10, 28]} /><meshStandardMaterial color="#c8ae78" metalness={0.9} roughness={0.22} /></mesh>
      {[0, Math.PI / 2].map((r) => <mesh key={r} position={[0, 0.61, 0]} rotation={[0, r, 0]} castShadow><boxGeometry args={[0.7, 0.06, 0.06]} /><meshStandardMaterial color="#c8ae78" metalness={0.9} roughness={0.22} /></mesh>)}
    </group>
  );
}

const flowCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-2.6, -1.75, 0), new THREE.Vector3(-2.6, 0.8, 0), new THREE.Vector3(-1.6, 1.7, 0),
  new THREE.Vector3(0.25, 1.7, 0), new THREE.Vector3(1.0, 1.0, 0), new THREE.Vector3(1.0, 0.05, 0),
  new THREE.Vector3(1.7, -0.5, 0), new THREE.Vector3(3.05, -0.5, 0),
]);

function FlowParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const count = 16;
  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.elapsedTime * 0.12;
    group.current.children.forEach((child, i) => child.position.copy(flowCurve.getPoint((t + i / count) % 1)));
  });
  return <group ref={group}>{Array.from({ length: count }, (_, i) => <mesh key={i} position={flowCurve.getPoint(i / count)}><sphereGeometry args={[0.055, 8, 8]} /><meshBasicMaterial color={WATER} transparent opacity={0.82} toneMapped={false} /></mesh>)}</group>;
}

function CameraParallax({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reducedMotion) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.3, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.25 + pointer.y * 0.16, 0.025);
    camera.lookAt(0, 0.15, 0);
  });
  return null;
}

function JdcMedallion() {
  return <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}><group position={[0.05, 0.35, 0.7]} rotation={[-0.05, -0.18, 0]}><mesh castShadow><cylinderGeometry args={[0.95, 0.95, 0.12, 64]} /><meshStandardMaterial color="#0a1623" metalness={0.82} roughness={0.22} /></mesh><mesh position={[0, -0.075, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.78, 0.035, 10, 48]} /><meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.2} /></mesh><Html transform position={[0, -0.075, -0.065]} rotation={[-Math.PI / 2, 0, 0]} distanceFactor={5.6} center style={{ pointerEvents: 'none' }}><div className="scene-medallion-text">JDC</div></Html></group></Float>;
}

function PipeSculpture({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.28) * 0.035 - 0.08;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.012;
  });
  const main = useMemo(() => [new THREE.Vector3(-2.6,-1.75,0),new THREE.Vector3(-2.6,.8,0),new THREE.Vector3(-1.6,1.7,0),new THREE.Vector3(.25,1.7,0),new THREE.Vector3(1,1,0),new THREE.Vector3(1,.05,0),new THREE.Vector3(1.7,-.5,0),new THREE.Vector3(3.05,-.5,0)], []);
  const branchA = useMemo(() => [new THREE.Vector3(-1.35,1.7,0),new THREE.Vector3(-1.35,.45,0),new THREE.Vector3(-.75,-.1,0),new THREE.Vector3(-.75,-1.6,0)], []);
  const branchB = useMemo(() => [new THREE.Vector3(1,.35,0),new THREE.Vector3(1.85,.35,0),new THREE.Vector3(2.35,.85,0),new THREE.Vector3(2.35,1.8,0)], []);
  const brassBranch = useMemo(() => [new THREE.Vector3(-.75,-.55,0),new THREE.Vector3(.15,-.55,0),new THREE.Vector3(.65,-1.05,0),new THREE.Vector3(.65,-1.65,0)], []);
  return <group ref={group} rotation={[.03,-.08,.02]} position={[0,-.05,0]}><Tube points={main}/><Tube points={branchA} radius={.145}/><Tube points={branchB} radius={.145}/><Tube points={brassBranch} radius={.13} material="brass"/><Coupler position={[-2.6,-1.25,0]}/><Coupler position={[1.65,-.5,0]} rotation={[0,0,Math.PI/2]} brass/><Coupler position={[-.75,-1.15,0]}/><Valve position={[2.35,1.05,0]}/><Valve position={[.65,-1.35,0]} rotation={[0,0,Math.PI/2]}/><JdcMedallion/><FlowParticles reducedMotion={reducedMotion}/></group>;
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return <><ambientLight intensity={0.9}/><directionalLight position={[-4,7,5]} intensity={2.2} color="#edf4ff" castShadow shadow-mapSize={[1024,1024]}/><spotLight position={[5,3,6]} intensity={70} angle={0.5} penumbra={0.9} color="#c4a66d"/><pointLight position={[-4,-1,3]} intensity={18} color="#6dbbd8"/><PipeSculpture reducedMotion={reducedMotion}/><ContactShadows position={[0,-2,0]} opacity={0.42} scale={7.5} blur={2.4} far={4.5}/><CameraParallax reducedMotion={reducedMotion}/></>;
}

export default function Hero3DScene({ reducedMotion }: { reducedMotion: boolean }) {
  return <Canvas dpr={[1,1.5]} camera={{ position:[0,.25,7.2], fov:39 }} gl={{ antialias:true, alpha:true, powerPreference:'high-performance' }} shadows={!reducedMotion} frameloop={reducedMotion?'demand':'always'} style={{ touchAction:'pan-y', pointerEvents:reducedMotion?'none':'auto' }}><Suspense fallback={null}><Scene reducedMotion={reducedMotion}/></Suspense></Canvas>;
}
