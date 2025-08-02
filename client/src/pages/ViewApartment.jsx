import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { SoftShadows, Float, CameraControls, Sky, PerformanceMonitor, Text, Box } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { easing } from "maath"

function Light() {
    const ref = useRef()
    useFrame((state, delta) => {
        easing.dampE(ref.current.rotation, [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0], 0.2, delta)
    })
    return (
        <group ref={ref}>
            <directionalLight position={[10, 10, 5]} castShadow intensity={3} shadow-mapSize={2048} shadow-bias={-0.001}>
                <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 50]} />
            </directionalLight>
        </group>
    )
}

// Individual room component that can be clicked
function HotelRoom({ position, roomNumber, isSelected, onSelect, isAvailable = true }) {
    const roomColor = isSelected ? "#4ade80" : (isAvailable ? "#4CAF50" : "#ef4444")
    const roomOpacity = isSelected ? 0.9 : 0.7

    return (
        <group position={position}>
            {/* Room Box */}
            <Box
                args={[4, 3, 4]}
                position={[0, 1.5, 0]}
                onClick={() => onSelect(roomNumber)}
            >
                <meshStandardMaterial
                    color={roomColor}
                    transparent
                    opacity={roomOpacity}
                    wireframe={isSelected}
                />
            </Box>

            {/* Floor */}
            <Box args={[4, 0.1, 4]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#21b027" />
            </Box>

            {/* Room number text */}
            <Text
                position={[0, 2.5, 2.1]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {roomNumber}
            </Text>

            {/* Status text */}
            <Text
                position={[0, 2, 2.1]}
                fontSize={0.3}
                color={isAvailable ? "#10b981" : "#ef4444"}
                anchorX="center"
                anchorY="middle"
            >
                {isAvailable ? "Available" : "Occupied"}
            </Text>
        </group>
    )
}

// Hotel building structure
function HotelBuilding({ selectedRoom, onRoomSelect }) {
    const roomsData = [
        { number: 101, position: [-10, 0, -2], available: true },
        { number: 102, position: [-5, 0, -2], available: true },
        { number: 103, position: [0, 0, -2], available: false },
        { number: 104, position: [5, 0, -2], available: true },
        { number: 105, position: [10, 0, -2], available: true },
        { number: 106, position: [-10, 0, 2], available: true },
        { number: 107, position: [-5, 0, 2], available: false },
        { number: 108, position: [0, 0, 2], available: true },
        { number: 109, position: [5, 0, 2], available: true },
        { number: 110, position: [10, 0, 2], available: true },
    ]

    return (
        <group>
            {/* Hotel base/foundation */}
            <Box args={[25, 0.5, 12]} position={[0, -0.25, 0]}>
                <meshStandardMaterial color="#6b7280" />
            </Box>

            {/* Render rooms */}
            {roomsData.map((room) => (
                <HotelRoom
                    key={room.number}
                    position={room.position}
                    roomNumber={room.number}
                    isSelected={selectedRoom === room.number}
                    onSelect={onRoomSelect}
                    isAvailable={room.available}
                />
            ))}
        </group>
    )
}

// UI Panel for room information
function RoomInfoPanel({ selectedRoom, roomsData }) {
    if (!selectedRoom) return null

    const room = roomsData.find(r => r.number === selectedRoom)

    return (
        <div className="absolute top-20 left-4 bg-black/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10 min-w-64">
            <h3 className="text-lg font-bold text-gray-100 mb-2">Room {selectedRoom}</h3>
            <div className="space-y-2 text-sm text-gray-400">
                <p><span className="font-semibold">Status:</span> {room?.available ? "Available" : "Occupied"}</p>
                <p><span className="font-semibold">Floor:</span> {Math.floor(selectedRoom / 100)}</p>
                <p><span className="font-semibold">Type:</span> Standard Room</p>
                <p><span className="font-semibold">Price:</span> $120/night</p>
                <p><span className="font-semibold">Amenities:</span> WiFi, AC, TV, Mini Bar</p>
            </div>
            {room?.available && (
                <button className="mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    Book Room
                </button>
            )}
        </div>
    )
}

export default function App() {
    const [bad, set] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.title = "View Apartment";
    }, [])

    const debug = false;
    const enabled = true;
    const config = { size: 35, focus: 0.5 };
    const samples = 16;

    const roomsData = [
        // First Floor (100s) - 10 rooms
        { number: 101, position: [-10, 0, -2], available: true },
        { number: 102, position: [-5, 0, -2], available: true },
        { number: 103, position: [0, 0, -2], available: false },
        { number: 104, position: [5, 0, -2], available: true },
        { number: 105, position: [10, 0, -2], available: true },
        { number: 106, position: [-10, 0, 2], available: true },
        { number: 107, position: [-5, 0, 2], available: false },
        { number: 108, position: [0, 0, 2], available: true },
        { number: 109, position: [5, 0, 2], available: true },
        { number: 110, position: [10, 0, 2], available: true },
    ]

    const handleRoomSelect = (roomNumber) => {
        setSelectedRoom(selectedRoom === roomNumber ? null : roomNumber)
    }

    return (
        <div className="relative w-full h-screen">

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white text-lg">Loading 3D View...</p>
                    </div>
                </div>
            )}

            <Canvas
                shadows
                camera={{ position: [15, 8, 12], fov: 50 }}
                style={{ background: '#000000' }}
                onCreated={() => setIsLoading(false)}
            >
                {debug && <Perf position="top-left" />}
                <PerformanceMonitor onDecline={() => set(true)} />
                {enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
                <CameraControls makeDefault minDistance={2} maxDistance={100} />

                {/* Environment */}
                <color attach="background" args={["#87ceeb"]} />
                <ambientLight intensity={0.4} />
                <Light />

                {/* Ground */}
                <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[40, 20]} />
                    <meshStandardMaterial color="#383838" />
                </mesh>

                {/* Hotel Building with Rooms */}
                <HotelBuilding
                    selectedRoom={selectedRoom}
                    onRoomSelect={handleRoomSelect}
                />

                <Sky sunPosition={[100, 20, 100]} />
            </Canvas>

            {/* Room Information Panel */}
            <RoomInfoPanel selectedRoom={selectedRoom} roomsData={roomsData} />
        </div>
    )
}

function Sphere({ color = "hotpink", floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
    return (
        <Float floatIntensity={floatIntensity}>
            <mesh castShadow position={position} scale={scale}>
                <sphereGeometry />
                <meshBasicMaterial color={color} roughness={1} />
            </mesh>
        </Float>
    )
}
