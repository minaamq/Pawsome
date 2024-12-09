import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useControls } from 'leva';

export function Model(props) {
  const group = React.useRef();
  const { scene } = useGLTF('/models/scene.gltf');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { animations } = useGLTF('/models/scene.gltf');
  const { actions, mixer } = useAnimations(animations, group);

  const { playAudio, script } = useControls({
    playAudio: false,
    script: {
      value: 'welcome',
      options: ['test'],
    },
  });

  const audio = useMemo(() => new Audio(`/audios/${script}.wav`), [script]);
  const [currentAnimation, setCurrentAnimation] = useState(animations[19].name); 

//default anim 

  useEffect(() => {
    const defaultAction = actions[animations[19].name];
    if (defaultAction) {
      defaultAction.reset().fadeIn(0.5).play();
    }

    // Clean up
    return () => {
      if (defaultAction) defaultAction.fadeOut(0.5);
    };
  }, [actions, animations]);


  useEffect(() => {
    if (playAudio) {
      audio.play();
      setCurrentAnimation(animations[1].name); 
    } else {
      audio.pause();
      setCurrentAnimation(animations[19].name); 
    }

    // Clean up audio 
    return () => {
      audio.pause();
      audio.currentTime = 0; 
    };
  }, [playAudio, audio, animations]);

  // Play current animation
  useEffect(() => {
    const action = actions[currentAnimation];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => {
      if (action) action.fadeOut(0.5);
    };
  }, [currentAnimation, actions]);

  useControls('FacialExpressions', {
    animation: {
      value: currentAnimation,
      options: animations.map((a) => a.name),
      onChange: (value) => setCurrentAnimation(value),
    },
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 3]}>
          <group
            name="Donkey_Avatar_animsfbx"
            rotation={[Math.PI / 2, 0.1, 0]}
            scale={0.2}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group
                    name="Object_6"
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={0.01}
                  />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.t_Donkey_eye_c}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.t_Donkey_c}
                    skeleton={nodes.Object_8.skeleton}
                    morphTargetDictionary={
                      nodes.Object_8.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Object_8.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/scene.gltf');
