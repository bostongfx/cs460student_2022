using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Base class of GUIControllers
/// Controls play, pause, stop animations
/// </summary>

public class GUIController : MonoBehaviour {


    protected void Reset(AnimationInfo agent) {

        ResetComponents(agent);
        StopAtFirstFrame(agent);

    }

    protected void ResetComponents(AnimationInfo agent) {

        //agent.GetComponent<Animation>().Stop();


        //agent.GetComponent<Animator>().enabled= false;
        
        agent.GetComponent<FlourishAnimator>().Reset();
        agent.GetComponent<TorsoController>().Reset();
        agent.Reset(agent.AnimName);
        agent.GetComponent<IKAnimator>().Reset();

    }

    protected void StopAtFirstFrame(AnimationInfo agent) {

        //agent.GetClip().SampleAnimation(agent.gameObject, 0f);
        //agent.GetComponent<Animator>().Play("anim",0, 0f);



        agent.transform.parent.GetComponent<Animator>().Play("Idle");
        //agent.GetComponent<Animator>().SetTrigger("play");


        agent.transform.parent.GetComponent<Animator>().speed = 0f;


        //agent.GetComponent<Animator>().enabled = false;

        agent.GetComponent<IKAnimator>().DisableIK();

        agent.IsPlaySelected = false;

        
        //if(!agent.GetComponent<Animation>().isPlaying)
        //if(!agent.IsPlaying())
        //  agent.GetComponent<Animator>().Play();
        //agent.GetComponent<Animation>().Play(agent.AnimName);

        //agent.GetComponent<Animation>().clip.SampleAnimation(agent.gameObject, 0); //instead of rewind
        //agent.GetComponent<Animation>().Stop();

    }

    protected void Play(AnimationInfo agent) {

        //agent.GetClip().wrapMode = WrapMode.ClampForever;

        agent.GetClip().wrapMode =WrapMode.Once;
        agent.transform.parent.GetComponent<Animator>().enabled = true;
        agent.transform.parent.GetComponent<Animator>().speed = agent.AnimSpeed;


        //agent.GetComponent<IKAnimator>().EnableIK();
        //agent.GetComponent<Animator>().SetTrigger("play");

  
        agent.transform.parent.GetComponent<Animator>().Play("anim", 0, 0);

        agent.IsPlaySelected = true;

        //capture BVH
        //agent.GetComponent<BVHRecorder>().capturing = true;

    }

    protected void StopBVHCapturing(AnimationInfo agent)
    {
        //stop capturing BVH
        agent.GetComponent<BVHRecorder>().capturing = false;
        agent.GetComponent<BVHRecorder>().saveBVH();

        //agent.GetComponent<BVHRecorder>().enabled = false;
    }

    protected void StopAnimations(AnimationInfo agent) {

        
        StopAtFirstFrame(agent);
        agent.GetComponent<TorsoController>().Reset();

        //Funda? 
        //StopAtFirstFrame(agent);
        //PlayAnim(agent); //start the next animation
        //StopAtFirstFrame(agent);

        //stop capturing BVH
        //funda: don't call it here
        //StopBVHCapturing(agent);
    }


    protected void InitAgent(AnimationInfo agent) {

        agent.Reset(agent.AnimName);
        agent.GetComponent<IKAnimator>().Reset();        
        agent.transform.parent.GetComponent<Animator>().Play("anim");
        
        //agent.GetComponent<Animation>().enabled = true;
        //agent.GetComponent<Animation>().Play(agent.AnimName);

    }


    protected void PlayAnim(AnimationInfo agent) {

        StopAtFirstFrame(agent); //stop first
        InitAgent(agent);

        
        agent.GetClip().wrapMode = WrapMode.Once;

    }

    protected void UpdateEmoteParams(AnimationInfo agent,  int driveInd) {
        if(agent == null) {
            Debug.Log("AgentPrefab not found");
            return;
        }


        DriveParams driveParams = new DriveParams(driveInd);


        agent.AnimSpeed = driveParams.Speed;
        agent.V0 = driveParams.V0;
        agent.V1 = driveParams.V1;

        agent.T0 = driveParams.T0;
        agent.T1 = driveParams.T1;
        agent.Ti = driveParams.Ti;


        agent.Texp = driveParams.Texp;

        float prevTVal = agent.Tval;
        float prevContinuity = agent.Continuity;
        agent.Tval = driveParams.Tval;
        agent.Continuity = driveParams.Continuity;

        if(driveParams.Tval != prevTVal || driveParams.Continuity != prevContinuity)
            agent.InitInterpolators(driveParams.Tval, driveParams.Continuity, 0);


        agent.GetComponent<FlourishAnimator>().TrMag = driveParams.TrMag;
        agent.GetComponent<FlourishAnimator>().TfMag = driveParams.TfMag;

        agent.GetComponent<IKAnimator>().HrMag = driveParams.HrMag;
        agent.GetComponent<IKAnimator>().HfMag = driveParams.HfMag;
        agent.ExtraGoal = driveParams.ExtraGoal;


        agent.GetComponent<IKAnimator>().SquashMag = driveParams.SquashMag; //breathing affects keypoints
        agent.GetComponent<IKAnimator>().SquashF = driveParams.SquashF; //breathing affects keypoints

        agent.GetComponent<FlourishAnimator>().WbMag = driveParams.WbMag;
        agent.GetComponent<FlourishAnimator>().WxMag = driveParams.WxMag;
        agent.GetComponent<FlourishAnimator>().WfMag = driveParams.WfMag;
        agent.GetComponent<FlourishAnimator>().WtMag = driveParams.WtMag;
        agent.GetComponent<FlourishAnimator>().EfMag = driveParams.EfMag;
        agent.GetComponent<FlourishAnimator>().EtMag = driveParams.EtMag;
        agent.GetComponent<FlourishAnimator>().DMag = driveParams.DMag;


        agent.GetComponent<IKAnimator>().ShapeTi = driveParams.ShapeTi;

        agent.GetComponent<IKAnimator>().EncSpr[0] = driveParams.EncSpr0;
        agent.GetComponent<IKAnimator>().SinRis[0] = driveParams.SinRis0;
        agent.GetComponent<IKAnimator>().RetAdv[0] = driveParams.RetAdv0;

        agent.GetComponent<IKAnimator>().EncSpr[1] = driveParams.EncSpr1;
        agent.GetComponent<IKAnimator>().SinRis[1] = driveParams.SinRis1;
        agent.GetComponent<IKAnimator>().RetAdv[1] = driveParams.RetAdv1;

        agent.GetComponent<IKAnimator>().EncSpr[2] = driveParams.EncSpr2;
        agent.GetComponent<IKAnimator>().SinRis[2] = driveParams.SinRis2;
        agent.GetComponent<IKAnimator>().RetAdv[2] = driveParams.RetAdv2;


        agent.UseCurveKeys = driveParams.UseCurveKeys;

        agent.Hor = driveParams.Arm[0].x;
        agent.Ver = driveParams.Arm[0].y;
        agent.Sag = driveParams.Arm[0].z;
        agent.UpdateKeypointsByShape(0); //Update keypoints

        //RightArm 
        //Only horizontal motion is the opposite for each arm
        agent.Hor = -driveParams.Arm[1].x;
        agent.Ver = driveParams.Arm[1].y;
        agent.Sag = driveParams.Arm[1].z;
        agent.UpdateKeypointsByShape(1); //Update keypoints


    }
}
