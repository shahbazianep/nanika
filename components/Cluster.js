import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { View } from "react-native";
//import ExpoTHREE from "expo-three";
import { Canvas, useFrame } from "@react-three/fiber/native";

import { COLORS, MOOD_BORDER_COLORS, EMOTIONS } from "../assets/constants.js";

function Swarm({ count, color }) {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -20 + Math.random() * 40;
            const yFactor = -20 + Math.random() * 40;
            const zFactor = -20 + Math.random() * 40;
            temp.push({
                t,
                factor,
                speed,
                xFactor,
                yFactor,
                zFactor,
                mx: 0,
                my: 0,
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 5; //
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.max(1.5, Math.cos(t) * 5);

            dummy.position.set(
                xFactor +
                    20 * Math.cos((t / 100) * factor) +
                    (Math.sin(t) * factor) / 10,
                yFactor +
                    Math.sin((t / 10) * factor) +
                    (Math.cos(t * 2) * factor) / 10,
                zFactor +
                    Math.cos((t / 10) * factor) +
                    (Math.sin(t * 3) * factor) / 10
            );
            // The following changes the size of the balls
            dummy.scale.set(s * 1.5, s * 1.5, s * 1.5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereGeometry attach="geometry" args={[1, 32, 32]} />
                <meshPhongMaterial attach="material" color={color} />
            </instancedMesh>
        </>
    );
}

const getEmotionCount = (emotion, emotions) => {
    if (emotions == undefined) {
        return 0;
    }
    let c = 0;
    for (const e of emotions) {
        if (e == emotion) {
            c++;
        }
    }
    return c;
};

const Cluster = ({ data }) => (
    <View style={{ width: "100%", height: "100%" }}>
        <Canvas
            gl={{
                alpha: true,
                antialias: false,
                logarithmicDepthBuffer: true,
            }}
            camera={{ fov: 75, position: [0, 0, 70] }}
            onCreated={({ gl }) => {
                gl.setClearColor("white");
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.outputEncoding = THREE.sRGBEncoding;
            }}
            setClearColor={"0xffffff"}
        >
            <color attach="background" args={[COLORS.white]} />
            <ambientLight intensity={1.1} />
            <pointLight position={[100, 100, 100]} intensity={1} />
            <pointLight
                position={[-100, -100, -100]}
                intensity={1}
                color="#CCCCFF"
            />
            {EMOTIONS.map((emotion, index) => (
                <Swarm
                    count={getEmotionCount(emotion, data.emotions)}
                    color={MOOD_BORDER_COLORS[emotion][0]}
                    key={index}
                />
            ))}
        </Canvas>
    </View>
);

export default Cluster;
