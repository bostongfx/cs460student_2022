using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using RootMotion.FinalIK;
using RootMotion; // Need to include the RootMotion namespace as well because of the BipedReferences
// using Siccity.GLTFUtility;


public class ComponentInitializer : MonoBehaviour
{

    
    public RuntimeAnimatorController refController;

    public void Reset() {
        //Build avatar


        //Avatar avatar = AvatarBuilder.BuildHumanAvatar(transform.parent.gameObject,  refAvatar.humanDescription);

        //TODO: build avatar automaticaly
        Avatar avatar = transform.parent.GetComponent<Animator>().avatar;

        //transform.parent.gameObject.AddComponent<BVHRecorder>();



        if (!avatar.isValid)
        {
            Debug.Log("Invalid avatar " + avatar);
            return;
        }

        Debug.Log("Valid avatar found " + avatar);

        Animator animator = transform.parent.GetComponent<Animator>();
        animator.runtimeAnimatorController = refController;
        
        animator.avatar = avatar;



        //Init torso joints
        TorsoController torso = GetComponent<TorsoController>();



        torso.Root = animator.GetBoneTransform(HumanBodyBones.Hips);
        torso.Neck = animator.GetBoneTransform(HumanBodyBones.Neck);
        torso.Head = animator.GetBoneTransform(HumanBodyBones.Head);

        torso.Hips = animator.GetBoneTransform(HumanBodyBones.Hips);

        torso.Spine = animator.GetBoneTransform(HumanBodyBones.Spine);
        torso.Spine1 = animator.GetBoneTransform(HumanBodyBones.Chest);
        torso.Spine2 = animator.GetBoneTransform(HumanBodyBones.UpperChest);

        torso.Clavicle[0] = animator.GetBoneTransform(HumanBodyBones.LeftShoulder);
        torso.Clavicle[1] = animator.GetBoneTransform(HumanBodyBones.RightShoulder);

        torso.Shoulder[0] = animator.GetBoneTransform(HumanBodyBones.LeftUpperArm);
        torso.Shoulder[1] = animator.GetBoneTransform(HumanBodyBones.RightUpperArm);


        torso.Elbow[0] = animator.GetBoneTransform(HumanBodyBones.LeftLowerArm);
        torso.Elbow[1] = animator.GetBoneTransform(HumanBodyBones.RightLowerArm);

        torso.Wrist[0] = animator.GetBoneTransform(HumanBodyBones.LeftHand);
        torso.Wrist[1] = animator.GetBoneTransform(HumanBodyBones.RightHand);

        torso.Pelvis[0] = animator.GetBoneTransform(HumanBodyBones.LeftUpperLeg);
        torso.Pelvis[1] = animator.GetBoneTransform(HumanBodyBones.RightUpperLeg);


        torso.Knee[0] = animator.GetBoneTransform(HumanBodyBones.LeftLowerLeg);
        torso.Knee[1] = animator.GetBoneTransform(HumanBodyBones.RightLowerLeg);


        torso.Foot[0] = animator.GetBoneTransform(HumanBodyBones.LeftFoot);
        torso.Foot[1] = animator.GetBoneTransform(HumanBodyBones.RightFoot);


        torso.Toe[0] = animator.GetBoneTransform(HumanBodyBones.LeftToes);
        torso.Toe[1] = animator.GetBoneTransform(HumanBodyBones.RightToes);

        torso.BodyChain = torso.BodyChainToArray(torso.Root);
        torso.BodyPath = torso.BodyChainToPath(torso.Root);

        torso.BodyPos = torso.BodyPosArr(torso.BodyChain);
        torso.BodyRot = torso.BodyRotArr(torso.BodyChain);


        torso.BodyLocalPos = torso.BodyLocalPosArr(torso.BodyChain);
        torso.BodyLocalRot = torso.BodyLocalRotArr(torso.BodyChain);


        //Init FBIK joints
        FullBodyBipedIK fbIK = GetComponent<FullBodyBipedIK>();
        //fbIK.References.Root

        //Add LookatIK

        // Auto-detect the biped definition if we don't have it yet
        BipedReferences references = null;
        BipedReferences.AutoDetectReferences(ref references, transform.parent, BipedReferences.AutoDetectParams.Default);


        fbIK.SetReferences(references, transform.parent);
        fbIK.solver.rootNode = torso.Hips;
        fbIK.solver.bodyEffector.bone = torso.Hips;

        //fbIK.solver.rightHandEffector.bone = animator.GetBoneTransform(HumanBodyBones.RightHand);
        //fbIK.solver.leftHandEffector.bone = animator.GetBoneTransform(HumanBodyBones.LeftHand);

        //fbIK.solver.rightFootEffector.bone = animator.GetBoneTransform(HumanBodyBones.RightFoot);
        //fbIK.solver.leftFootEffector.bone = animator.GetBoneTransform(HumanBodyBones.LeftFoot);

        

        //todo: Set bones

        //We also need to set effector targets in this version??
        //does not work with a different model
        //fbIK.SetReferences(references, torso.Hips);
        //fbIK.solver.bodyEffector.target = fbIK.solver.bodyEffector.bone;

        //fbIK.solver.rightHandEffector.target = fbIK.solver.rightHandEffector.bone;
        //fbIK.solver.leftHandEffector.target = fbIK.solver.leftHandEffector.bone;

        //fbIK.solver.rightShoulderEffector.target = fbIK.solver.rightShoulderEffector.bone;
        //fbIK.solver.leftShoulderEffector.target = fbIK.solver.leftShoulderEffector.bone;

        //fbIK.solver.rightFootEffector.target = fbIK.solver.rightFootEffector.bone;
        //fbIK.solver.leftFootEffector.target = fbIK.solver.leftFootEffector.bone;

        //fbIK.solver.rightThighEffector.target = fbIK.solver.rightThighEffector.bone;
        //fbIK.solver.leftThighEffector.target = fbIK.solver.leftThighEffector.bone;





        //Add laik to head

        LookAtIK laIK = torso.Head.gameObject.AddComponent<LookAtIK>() as LookAtIK;


        Transform[] spine = new Transform[3];

        spine[0] = torso.Spine;
        spine[1] = torso.Spine1;
        spine[2] = torso.Spine2;

        laIK.solver.SetChain(spine, torso.Head, null, torso.Hips);


    }
    //Runtime import of gltf
    // void ImportGLTFAsync(string filepath) {
    //     Importer.ImportGLTFAsync(filepath, new ImportSettings(), OnFinishAsync);
    // }

    void OnFinishAsync(GameObject result, AnimationClip[] animations) {
        Debug.Log("Finished importing " + result.name);
    }
    void Awake()
    {
        // ImportGLTFAsync("Assets/test_1.gltf");
        Reset();

       
        

    }


}
