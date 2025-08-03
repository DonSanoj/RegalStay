import { Node, Nodes } from '@/components/includes/Nodes'
import { Canvas } from '@react-three/fiber'
import React, { createRef, useEffect, useState } from 'react'

const About = () => {

    const [[a, b, c, d]] = useState(() => [...Array(4)].map(createRef))

    useEffect(() => {
        document.title = "About RegalStay";
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className=" relative max-w-6xl mx-auto mt-20">
                {/* <h1 className="text-4xl font-bold text-white mb-2">About RegalStay</h1>
                <p className="text-gray-300 mb-8">Discover our luxury hotel management system and services</p> */}
                
                {/* 3D Visualization */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-200 mb-6">Hotel Network Connection</h2>
                    <div className="h-96 w-full border border-gray-700 rounded-lg">
                        <Canvas orthographic camera={{ zoom: 60, position: [0, 0, 5] }} className="h-full w-full">
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Nodes>
                                <Node ref={a} name="RegalStay Colombo" color="#ff6b35" position={[-1, -0.5, 0]} connectedTo={[b, c, d]} />
                                <Node ref={b} name="RegalStay Kandy" color="#209040" position={[1, 1.5, 0]} />
                                <Node ref={c} name="RegalStay Galle" color="#204090" position={[-2, -2.5, 0]} />
                                <Node ref={d} name="RegalStay Trincomalee" color="#9040ff" position={[3, 0.5, 0]} />
                            </Nodes>
                        </Canvas>
                    </div>
                </div>

                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                        <p className="text-gray-300 leading-relaxed">
                            RegalStay is committed to providing exceptional hotel management solutions 
                            that enhance guest experiences while streamlining operations for hotel staff.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="text-gray-300 space-y-2">
                            <li>• Advanced booking system</li>
                            <li>• Real-time room management</li>
                            <li>• Guest service tracking</li>
                            <li>• Comprehensive reporting</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About