import * as THREE from 'three'
import { createContext, useMemo, useRef, useState, useContext, useLayoutEffect, forwardRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { QuadraticBezierLine, Text } from '@react-three/drei'

const context = createContext()
const Circle = forwardRef(({ children, opacity = 1, radius = 0.05, segments = 32, color = '#ff1050', ...props }, ref) => (
    <mesh ref={ref} {...props}>
        <circleGeometry args={[radius, segments]} />
        <meshBasicMaterial transparent={opacity < 1} opacity={opacity} color={color} />
        {children}
    </mesh>
))

export function Nodes({ children }) {
    const group = useRef()
    const [nodes, set] = useState([])
    const lines = useMemo(() => {
        const lines = []
        for (let node of nodes)
            node.connectedTo
                .map((ref) => [node.position, ref.current.position])
                .forEach(([start, end]) => lines.push({ start: start.clone().add({ x: 0.35, y: 0, z: 0 }), end: end.clone().add({ x: -0.35, y: 0, z: 0 }) }))
        return lines
    }, [nodes])
    useFrame((_, delta) => group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 10)))
    return (
        <context.Provider value={set}>
            <group ref={group}>
                {lines.map((line, index) => (
                    <group key={index}>
                        <QuadraticBezierLine {...line} color="white" dashed dashScale={50} gapSize={20} />
                        <QuadraticBezierLine {...line} color="white" lineWidth={0.5} transparent opacity={0.1} />
                    </group>
                ))}
            </group>
            {children}
            {lines.map(({ start, end }, index) => (
                <group key={index} position-z={1}>
                    <Circle position={start} />
                    <Circle position={end} />
                </group>
            ))}
        </context.Provider>
    )
}

export const Node = forwardRef(({ color = 'black', name, connectedTo = [], position = [0, 0, 0], ...props }, ref) => {
    const set = useContext(context)
    const [pos] = useState(() => new THREE.Vector3(...position))
    const [hovered, setHovered] = useState(false)
    const state = useMemo(() => ({ position: pos, connectedTo }), [pos, connectedTo])
    
    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
        set((nodes) => [...nodes, state])
        return () => void set((nodes) => nodes.filter((n) => n !== state))
    }, [state])
    
    return (
        <Circle ref={ref} opacity={0.2} radius={0.5} color={color} position={pos} {...props}>
            <Circle
                radius={0.25}
                position={[0, 0, 0.1]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                color={hovered ? '#11d449' : color}>
                <Text position={[0, 0, 1]} fontSize={0.25}>
                    {name}
                </Text>
            </Circle>
        </Circle>
    )
})
