
using System.IO;
using UnityEngine;
using System.Collections.Generic;
using System.Collections;

using UnityEngine.Networking;
using System;
using System.Runtime.InteropServices;
using System.Xml.Linq;
using Siccity.GLTFUtility;



//using Meta.Numerics.Statistics;
#if UNITY_EDITOR
using UnityEditor;
#endif


[System.Serializable]
public class KeyInfo  {
	public int FrameNo;
    public float Time;
    public bool IsGoal; //either via or goal    
    public bool IsCurve; //path determining keys
    public Vector3 RootForward;
	public Vector3[] EePos = new Vector3[5]; 	  			//end effector key position	for arms, feet and hips
    public Vector3[] EePosOrig  = new Vector3[5]; 	 //original end effector key position before modified by armshape    
    public Vector3[] ShoulderPos = new Vector3[2]; 	  			//shoulder key position	
    public Vector3[] ShoulderPosOrig = new Vector3[2]; 	  			//shoulder key position	
    
    
    public Vector3[] EeVel = new Vector3[5]; //velocity of the end effector	


    public Vector3[] BodyVel;
    
    public List<Vector3> BodyPos;
    public List<Quaternion> BodyRot;

    public List<Vector3> BodyLocalPos;
    public List<Quaternion> BodyLocalRot;




    public float[] TimeUpdated = new float[2];

}

public enum EEType {
    LeftHand,
    RightHand,
    LeftFoot,
    RightFoot,
    Root   
}

[System.Serializable]
public class MyKeyframe {
   public float time { get; set; }
}


/// <summary>
/// Finds the joint positions and rotations at the keyframes
///
/// </summary>
public class AnimationInfo : MonoBehaviour {

    public bool ApplyRootMotion;
    public bool DisableLMA;
    public string CharacterName;

    [HideInInspector]
    public bool IsPlaySelected;

    //Timing parameters
    public float T0 = 0f; //EMOTE values
    public float T1 = 1f; //EMOTE values
    public float Texp = 1f;  //Default time exponent
    public float Ti = 0.5f; //0.5f; 	 //Inflection point where the movement changes from accelerating to decelerating
    public float V0 = -1f; 	 //Start velocity for constant speed
    public float V1 = -1f; 	 //End velocity for constant speed
    public float Tval;  //Tension	
    
    public float Continuity = 0f;
    private float _vi; //inflection velocity --cannot be updated
    public int CurrKeyInd;
    public float LocalT;
    public float GlobalT;
    
    public int ExtraGoal; //whether there is an extra goal in the middle
    public int UseCurveKeys;


    

    private Animator _animator;

    public List<AnimationClip> AnimationClips;
    private AnimationClip _animationClip;
    [SerializeField] 
    private AnimatorOverrideController _animatorOverrideController;


    //Shape parameters
    public float Hor = 0f; //[-1 1]
    public float Ver = 0f;
    public float Sag = 0f;
    public const float Abratio =  2.5f;//1.1f; //shoulde be >1
    public const float MaxdTheta = Mathf.PI / 6.0f; //Mathf.PI/20.0f;  //values in Liwei Zhao's thesis
    
	
    public float Fps;
    public float AnimLength;
    public KeyInfo[] Keys;



    private Vector3 _initialPosition; //to reset back to this position after root transform is applied

    public TCBSpline SIKeyTime; //Keyframe to time interpolator
    public TCBSpline[] SIee = new TCBSpline[2]; //End effector position interpolator

    public TCBSpline[] SIBody; //End effector position interpolator
    public TCBSpline[] SIBodyLocal; //End effector position interpolator

    string Message = "hi";
    
	public string AnimName ="";
	public int FrameCnt;


	[SerializeField]
    
    public List<Transform> BodyChainTorso;

    private TorsoController _torso;

    //because editor does not work here we cannot get keyframe information
	public List <int> GoalKeys = new List<int>() ;  //keeps the keyframe number (not actual index)  we need to include the start and end keyframes {0, 3, 5, 8};
    public List<float> GoalSpeeds = new List<float>();  
    public int[] CurveKeys;  //determine the arm path curvature    
    public KeyframeExtractor KeyExtractor;

    public float GoalThreshold = 0.001f; //0.1f; //shows the speed of the ee at goal points

    
    public float NormalizedT {
        get {
            
            if(IsPlaying()) //open in demodrives close in democomparison
                return (_animator.GetCurrentAnimatorStateInfo(0).normalizedTime - Mathf.FloorToInt(_animator.GetCurrentAnimatorStateInfo(0).normalizedTime)); //speed * _animInfo.DefaultAnimSpeed;            
            return 0;
        }
    }


    float _animSpeed;
    public float AnimSpeed {
        get {
            return _animSpeed;            
        }
        set {            
            _animSpeed = value;
            _animator.speed = value;
        }
    }


    public float Tp {//Normalized time between goal keypoints	
        get {
            if (Curr <= PrevGoal)
                return 0;
            if (NextGoal == PrevGoal)
                return 1;
            return (float)(Curr - PrevGoal) / (NextGoal - PrevGoal);

        }

    }

    //current animation time
    public float Curr {
        get {
            
            return _animator.GetCurrentAnimatorStateInfo(0).normalizedTime * _animationClip.length;            
        }
    }

    public int PrevGoalKeyInd {
        get {
            if (Curr >= Keys[GoalKeys[GoalKeys.Count - 1]].Time) {
                    return GoalKeys.Count - 1;
                    //return GoalKeys[GoalKeys.Length - 1];

            }
            for (int i = 0; i < GoalKeys.Count - 1; i++) {
                if (Curr >= Keys[GoalKeys[i]].Time && Curr < Keys[GoalKeys[i + 1]].Time)
                    return i;
                    //return GoalKeys[i];
            }


            throw new System.Exception("Unable to compute previous goal index " + Curr);
        }

    }

     
    //Previous goal keyframe's time
    public float PrevGoal {
        get {
            //return Keys[PrevGoalKeyInd].Time;
            return Keys[GoalKeys[PrevGoalKeyInd]].Time;
        }
    }


    //Next keyframe's frame number
    public float NextGoal {
        get {
            int nextGoalKeyInd = PrevGoalKeyInd + 1;
            if (nextGoalKeyInd > GoalKeys.Count - 1)
                nextGoalKeyInd = GoalKeys.Count - 1;

            return Keys[GoalKeys[nextGoalKeyInd]].Time;

        }
    }
    //To test if animation is playing with the wrapmode = clampforever
    public bool AnimationOver() {
        return (Curr >= AnimLength);
    }


    public bool IsPlaying() {        
        if(IsPlaySelected && _animator.GetCurrentAnimatorStateInfo(0).IsName("anim") && _animator.GetCurrentAnimatorStateInfo(0).normalizedTime <= 1)
            IsPlaySelected = false;
        return (IsPlaySelected || _animator.GetCurrentAnimatorStateInfo(0).IsName("anim") && _animator.GetCurrentAnimatorStateInfo(0).normalizedTime <= 1);

    }


    public AnimationClip GetClip() {

        foreach(AnimationClip a in AnimationClips) {

            if(a.name.ToUpper().Equals(AnimName.ToUpper())) {                
                return a;
                
            }
        }

        return AnimationClips[0];
        //return _animator.GetCurrentAnimatorClipInfo(0)[0].clip;
    }

    private void OnGUI()
    {

        GUILayout.Label(Message);
    }

    //Runtime import of gltf
     void ImportGLTFAsync(string filepath) {
         Importer.ImportGLTFAsync(filepath, new ImportSettings(), OnFinishAsync);
    }


    //following three methods bound to 'Agent' game object, called from Browser JS
    public void ReceiveAnimationFromPage(string url) {
        
        StartCoroutine(GetBundle(url, "anim"));       
    }

    public void ReceiveModelFromPage(string url) {
        Debug.Log("received model");
        StartCoroutine(GetBundle(url, "model"));
    }
    
    void ReceiveSceneFromPage(string url) {
        Debug.Log("entered method scene");
        
        StartCoroutine(GetBundle(url, "scene"));       
    }

    void OnFinishAsync(GameObject result, AnimationClip[] animations) {
        Debug.Log("Finished importing " + result.name);
    }

    void OnProgressAsync(float progress) {
        Debug.Log("Importing " + progress);
    }



    void ImportGLBAsync(byte[] fileContent) {
       // Importer.ImportGLBAsync(fileContent, new ImportSettings(), OnFinishAsync, OnProgressAsync);

        AnimationClip[] animations;
        GameObject go = Importer.LoadFromBytes(fileContent,  new ImportSettings(), out animations);
   
        Debug.Log("import called");
    }

    public void ReceiveGLTF(string url) {


        StartCoroutine(ReadFileAsync(url));

    }

    IEnumerator ReadFileAsync(string url) {      
        
        UnityWebRequest www = UnityWebRequest.Get(url);
        yield return www.SendWebRequest();

       
        Debug.Log(www.downloadHandler.data.Length);

        ImportGLBAsync(www.downloadHandler.data);

    }

    IEnumerator GetBundle(string url, string category)
    {
        using (UnityWebRequest uwr = UnityWebRequestAssetBundle.GetAssetBundle(url))
        {
            yield return uwr.SendWebRequest();

            if (uwr.result != UnityWebRequest.Result.Success)
            {
                Message = uwr.error;
            }
            else
            {
                Debug.Log("prior DOWNLOAD");
                // Get downloaded asset bundle
                AssetBundle bundle = DownloadHandlerAssetBundle.GetContent(uwr);
                Debug.Log("after DOWNLOAD");

                if (category == "anim")
                {
                    var animations = bundle.LoadAllAssets(typeof(AnimationClip));


                    int n = 0;
                    foreach (var animFile in animations)
                    {
                        AnimationClips.Add((AnimationClip)animFile);
                        Message = n.ToString(); //TODO for debug: delete
                        n++;
                    }
                }
                else if (category == "model")
                {

                    var gameObjects = bundle.LoadAllAssets(typeof(GameObject));
                    int n = 0;
                    foreach (var go in gameObjects) {
                        ChangeModel((GameObject)go);
                        Message = n.ToString(); //TODO for debug: delete
                        n++;
                    }
                }
                else if (category == "scene")
                {
                    Debug.Log("todo: process scene");
                    var unityEngineObjectList = bundle.LoadAllAssets();
                    Instantiate(unityEngineObjectList[0], new Vector3(0f, 0f, 0f), Quaternion.identity);
                    Debug.Log("This is: " + unityEngineObjectList[0]);
                }
                
            }
        }
    }


    //ChangeModel associated with 'agent' game object as AnimationInfo is component therein
    public void ChangeModel(GameObject prefab)
    {
        // prefab is like a pre-built template of the game object that we then make a copy of
        GameObject newModel = Instantiate(prefab, new Vector3(0f, 0f, 0f), Quaternion.identity);

        GameObject currModel = transform.parent.gameObject;

        
        transform.parent = newModel.transform;
        _animator = transform.parent.GetComponent<Animator>();

        _animationClip = GetClip();
        // i.e., 'Agents'
        transform.parent.parent = GameObject.Find("agents").transform;
        currModel.SetActive(false);
        
        
        //reset components
        GetComponent<ComponentInitializer>().Reset();

        _animator.runtimeAnimatorController = _animatorOverrideController; //componentinitializer sets them back to reference controller
        _animator.Play("Idle", 0, 0); //should be called after setting a runtimeanimatorcontroller
        _animator.speed = 0f;


        GetComponent<TorsoController>().Reset();
        _torso = GetComponent<TorsoController>();
        Reset(AnimName);
        GetComponent<FlourishAnimator>().Reset();                
        GetComponent<IKAnimator>().Reset();
        
    }


    void Awake() {

        _torso = GetComponent<TorsoController>();

        _animator = transform.parent.GetComponent<Animator>();

        _initialPosition = transform.parent.position;

         _animator.applyRootMotion = ApplyRootMotion;
        _animationClip = GetClip();


        CharacterName = CharacterName.ToUpper();


        AnimName = _animationClip.name;

        _animatorOverrideController = new AnimatorOverrideController(_animator.runtimeAnimatorController);
        _animatorOverrideController.name = "chuckOverride"; //not important, only here to view in inspector
        _animator.runtimeAnimatorController = _animatorOverrideController;
        _animatorOverrideController["Pointing"] = _animationClip;
    }

    public void ChangeAnimation(string newAnimName) {
        AnimationClip newAnim = null;
        foreach(AnimationClip a in AnimationClips) {
            
            if(a.name.ToUpper().Equals(newAnimName.ToUpper())) {
                newAnim = a;
               
                break;
            }
        }

        if(newAnim){
            _animatorOverrideController["Pointing"] = newAnim; //pointing is the default animation            

            AnimName = newAnimName;
            _animationClip = newAnim;

        }
        else {
            Debug.Log("Animation " + newAnimName + " not found.");
        }

    }


    
    public List<string> GetAnimNames() {
        List<string> animNames = new List<string>();
        foreach(AnimationClip a in AnimationClips)
            animNames.Add(a.name);

        return animNames;
    }


    public void ResetParameters() {

        V0 = V1 = 0f;
        Ti = 1f; //0.5f;
        Texp = 1.0f;
        Tval = 0f;
        Continuity = 0f;
        T0 = 0f;
        T1 = 2f;//1f;        

    }
    
    public void Reset(string aName) {

        
        AnimName = aName;


        _animationClip = GetClip();

        transform.parent.position = _initialPosition;

        transform.parent.GetComponent<Animator>().applyRootMotion = ApplyRootMotion;

        Fps = _animationClip.frameRate;
        AnimLength = _animationClip.length;
        FrameCnt = Mathf.CeilToInt(Fps * AnimLength);

        AnimSpeed = 1f;

    
        GetComponent<IKAnimator>().DisableIK(); //so that it can sample correctly

        KeyExtractor = new KeyframeExtractor();

        InitKeyPoints(); //should always update interpolators

        
        InitInterpolators(Tval, Continuity, 0);

        if(!DisableLMA)
            GetComponent<IKAnimator>().EnableIK(); //enable it back

        LocalT = 0f;
        GlobalT = 0f;


    }

    

    //goals keep the key index, not frame index
    void AssignGoalKeys(int ind) {

        //Compute end effector velocity
        for (int i = 1; i < Keys.Length-1; i++) {            
                Keys[i].EeVel[ind] = (Keys[i + 1].EePos[ind] - Keys[i - 1].EePos[ind]) / (Keys[i + 1].Time - Keys[i - 1].Time);
        }

       
        GoalKeys.Clear();
        GoalKeys.Add(0);

        GoalSpeeds.Clear();
        GoalSpeeds.Add(0);

        Keys[0].IsGoal = true;



        ////        manually for walk
        //if(AnimName.ToUpper().Contains("WALK")) {
        //    int[] walkGoals = { 2, 5, 11, 15 }; //steps
        //    for(int i = 0; i < walkGoals.Length; i++) {
        //        GoalSpeeds.Add(0);
        //        GoalKeys.Add(walkGoals[i]);
        //        Keys[walkGoals[i]].IsGoal = true;
        //    }
        //}

        //else {
        int goalInd = 0;
        //find local minima
        for(int i = 1; i < Keys.Length - 1; i++) {

            //TODO: check these
            if(Keys[i].EeVel[ind].magnitude < Keys[i - 1].EeVel[ind].magnitude && Keys[i].EeVel[ind].magnitude <= Keys[i + 1].EeVel[ind].magnitude
                && Keys[i].EeVel[ind].magnitude <= 1f && Keys[i].Time - Keys[GoalKeys[GoalKeys.Count - 1]].Time > 0.5f) {
                Keys[i].IsGoal = true;
                GoalKeys.Add(i);
                GoalSpeeds.Add(Keys[i].EeVel[ind].magnitude);

                goalInd++;
            }
            else
                Keys[i].IsGoal = false;
        }
        //}
        
        GoalSpeeds.Add(0);    
        GoalKeys.Add(Keys.Length-1);
        Keys[Keys.Length - 1].IsGoal = true;

        
    }

    public void InitKeyPoints() {


        //Uniformly sample keyframes
        //int keyframeCnt = Mathf.FloorToInt(_animationClip.frameRate * _animationClip.length);//20;

        int keyframeCnt = (int) (20 * _animationClip.length/ 1.7f); //assume pointing has 20 keyframes


        Keys = new KeyInfo[keyframeCnt];


        //Sample at the key points
        Vector3[] eePosMean = new Vector3[4];
        for(int i = 0; i <  keyframeCnt; i++) {
                Keys[i] = new KeyInfo();

            
            Keys[i].Time = i * _animationClip.length / (keyframeCnt-1);//frames[i].time;
            Keys[i].FrameNo = i;

            _animationClip.SampleAnimation(this.gameObject, Keys[i].Time);
            

            Keys[i].IsCurve = false;

            //Keys[i].FrameNo = i; //take all keys
            
            //body chain and transformation arrays for the specific animation
            BodyChainTorso = _torso.BodyChainToArray(_torso.Root); //needs to be updated for each keyframe
            Keys[i].BodyPos = _torso.BodyPosArr(BodyChainTorso);
            Keys[i].BodyRot = _torso.BodyRotArr(BodyChainTorso);
            Keys[i].BodyLocalPos = _torso.BodyLocalPosArr(BodyChainTorso);
            Keys[i].BodyLocalRot = _torso.BodyLocalRotArr(BodyChainTorso);

            Keys[i].BodyVel = new Vector3[BodyChainTorso.Count];

            //Hands
            for (int ind = 0; ind < 2; ind++) {
                Keys[i].ShoulderPos[ind] = Keys[i].ShoulderPosOrig[ind] = _torso.Shoulder[ind].position;
                Keys[i].EePos[ind] = Keys[i].EePosOrig[ind] = _torso.Wrist[ind].position;

                eePosMean[ind] += Keys[i].EePos[ind];
            }
            //Feet
            for (int ind = 2; ind < 4; ind++) {
                Keys[i].EePos[ind] = Keys[i].EePosOrig[ind] = _torso.Foot[ind - 2].position;
                eePosMean[ind] += Keys[i].EePos[ind];
            }

            Keys[i].EePos[4] = Keys[i].EePosOrig[4] = _torso.Root.position;
            Keys[i].RootForward = _torso.Root.forward;
        }

        

        //check which end effector has the highest variation and get its goal keys
        float[] eePosVar = new float[4];
        float maxVar = -Mathf.Infinity;
        int eeInd = (int)EEType.RightHand;
       for(int ind = 0; ind < 4; ind++) {
            eePosMean[ind] /= keyframeCnt;
            eePosVar[ind] = 0;
            for(int i = 0; i < keyframeCnt; i++) {
                eePosVar[ind] += Vector3.Distance(Keys[i].EePos[ind], eePosMean[ind]);
        
            }
            if(eePosVar[ind] > maxVar) {
                maxVar = eePosVar[ind];
                eeInd = ind;

            }
        }        
        AssignGoalKeys(eeInd);


    }



    public Vector3 ComputeInterpolatedBodyPos(Transform bodyPart, int keyInd, float lt) {

        int chainInd = _torso.BodyChain.IndexOf(bodyPart);

        
        if (keyInd + 1 > Keys.Length - 1)
            return Keys[keyInd].BodyPos[chainInd];

        return SIBody[chainInd].GetInterpolatedSplinePoint(lt, keyInd);

        //return Vector3.Lerp(Keys[keyInd].BodyPos[chainInd], Keys[keyInd + 1].BodyPos[chainInd], lt);

    }


    public Quaternion ComputeInterpolatedBodyRot(Transform bodyPart, int keyInd, float lt) {

        int chainInd = BodyChainTorso.IndexOf(bodyPart);

        if (keyInd + 1 > Keys.Length - 1)
            return Keys[keyInd].BodyRot[chainInd];

        return Quaternion.Slerp(Keys[keyInd].BodyRot[chainInd], Keys[keyInd + 1].BodyRot[chainInd], lt);

    }

    public Vector3 ComputeInterpolatedBodyLocalPos(Transform bodyPart, int keyInd, float lt) {

        int chainInd = BodyChainTorso.IndexOf(bodyPart);
        

        if (keyInd + 1 > Keys.Length - 1)
            return Keys[keyInd].BodyLocalPos[chainInd];

        return SIBodyLocal[chainInd].GetInterpolatedSplinePoint(lt, keyInd);
       // return Vector3.Lerp(Keys[keyInd].BodyLocalPos[chainInd], Keys[keyInd + 1].BodyLocalPos[chainInd], lt);

    }


    public Quaternion ComputeInterpolatedBodyLocalRot(Transform bodyPart, int keyInd, float lt) {

        int chainInd = BodyChainTorso.IndexOf(bodyPart);
        
        if (keyInd + 1 > Keys.Length - 1)
            return Keys[keyInd].BodyLocalRot[chainInd];

        return Quaternion.Slerp(Keys[keyInd].BodyLocalRot[chainInd], Keys[keyInd + 1].BodyLocalRot[chainInd], lt);

    }


    public void InterpolateWholeBody() {
        int keyInd = CurrKeyInd;
        float lt = LocalT;
        float t = GlobalT;
     
        Vector3 pivot = Vector3.zero;
        Quaternion pivotRot = Quaternion.identity;
        if(keyInd + 1 > Keys.Length - 1) {
            for (int i = 0; i < BodyChainTorso.Count; i++) {
                BodyChainTorso[i].transform.localPosition = Keys[keyInd].BodyLocalPos[i]; //were all local pos rot
                BodyChainTorso[i].transform.localRotation = Keys[keyInd].BodyLocalRot[i];
            }
     
        }
        else {


            for (int i = 0; i < BodyChainTorso.Count; i++) {

                if (t < 0) {
                    pivot = Keys[0].BodyLocalPos[i]; 
                }
                else if (t > 1) {
                    pivot = Keys[keyInd - 1].BodyLocalPos[i];
                }

                Vector3 pos = SIBodyLocal[i].GetInterpolatedSplinePoint(lt, keyInd);
                Quaternion rot = Quaternion.Slerp(Keys[keyInd].BodyLocalRot[i], Keys[keyInd + 1].BodyLocalRot[i], lt);
                

                if ((t < 0 || t > 1)){                    
                    BodyChainTorso[i].transform.localPosition = 2 * pivot - pos;                    
                    BodyChainTorso[i].transform.localRotation = rot; 
                    }
                else {
                    BodyChainTorso[i].transform.localPosition = pos;                           
                    BodyChainTorso[i].transform.localRotation = rot;
                }
            }          
          
        }
   
    }


  
    
	
	public void InitInterpolators (float tension, float continuity, float bias) {
	    SIBody = new TCBSpline[_torso.BodyChain.Count];
        SIBodyLocal = new TCBSpline[_torso.BodyChain.Count];

    
		for(int arm = 0; arm < 2; arm++) {

        
            //End effector
            ControlPoint[] controlPointsEE = new ControlPoint[Keys.Length];
            for(int i = 0; i< Keys.Length; i++) {
                controlPointsEE[i] = new ControlPoint();
                controlPointsEE[i].Point = Keys[i].EePos[arm];                
                controlPointsEE[i].TangentI = Vector3.zero;
                controlPointsEE[i].TangentO = Vector3.zero;                
                controlPointsEE[i].Time = Keys[i].Time;
            }

            SIee[arm] = new TCBSpline(controlPointsEE, tension, continuity, bias);            
		}


        for (int c = 0; c < _torso.BodyChain.Count; c++) {

            ControlPoint[] controlPointsBody = new ControlPoint[Keys.Length];
            ControlPoint[] controlPointsBodyLocal = new ControlPoint[Keys.Length];
            for (int i = 0; i < Keys.Length; i++) {
                controlPointsBody[i] = new ControlPoint();
                controlPointsBody[i].Point = Keys[i].BodyPos[c];
                controlPointsBody[i].TangentI = Vector3.zero;
                controlPointsBody[i].TangentO = Vector3.zero;
                controlPointsBody[i].Time = Keys[i].Time;

                controlPointsBodyLocal[i] = new ControlPoint();
                controlPointsBodyLocal[i].Point = Keys[i].BodyLocalPos[c];
                controlPointsBodyLocal[i].TangentI = Vector3.zero;
                controlPointsBodyLocal[i].TangentO = Vector3.zero;
                controlPointsBodyLocal[i].Time = Keys[i].Time;
            }
            //SIBody[c] = new TCBSpline(controlPointsBody, tension, continuity, bias);        
            SIBody[c] = new TCBSpline(controlPointsBody, tension, continuity, bias);
            SIBodyLocal[c] = new TCBSpline(controlPointsBodyLocal, tension, continuity, bias);     
            
        }
	}

/*
    public float ComputeInterpolatedTime(Vector3 point, int p) {
        return SIKeyTime.FindDistanceOnSegment(point, p);
    }
    */
	public Vector3 ComputeInterpolatedTarget(float lt, int p,  int arm) {
        return SIee[arm].GetInterpolatedSplinePoint(lt, p);			
	}

    
    //public void UpdateInterpolators() {
    //    float tp;
    //    float[] newKeyTimes = new float[Keys.Length];
    //    float[] originalKeyTimes = new float[Keys.Length];
    //    for (int i = 0; i < Keys.Length; i++) {

    //        int prevGoalKeyInd = FindPrevGoalAtTime(Keys[i].Time);
    //        int nextGoalKeyInd = prevGoalKeyInd + 1;
    //        if (nextGoalKeyInd > GoalKeys.Count - 1)
    //            nextGoalKeyInd = GoalKeys.Count - 1;

    //        int prevGoal = GoalKeys[prevGoalKeyInd];
    //        int nextGoal = GoalKeys[nextGoalKeyInd];


    //        if (Keys[i].Time <= Keys[prevGoal].Time)
    //            tp = 0;
    //        else if (Keys[nextGoal].Time == Keys[prevGoal].Time)
    //            tp = 1;
    //        else {
    //            tp = (Keys[i].Time - Keys[prevGoal].Time) / (Keys[nextGoal].Time - Keys[prevGoal].Time);
    //        }

    //        float t0, t1,ti, v0, v1;
            
            
    //         //no anticipation or overshoot except first and last keys
    //        if (prevGoalKeyInd == 0) {
    //            t0 = T0;
    //            v0 = V0;
                
    //        }
    //        else { //should shift ti as well
    //            t0 = 0;
    //            v0 = 0;
                               
    //        }

    //        if (prevGoalKeyInd + 1 == GoalKeys.Count - 1) {
    //            t1 = T1;
    //            v1 = V1;
    //        }
    //        else {
    //            t1 = 1;
    //            v1 = 0;
    //        }

    //        //should shift ti as well
    //        ti = Ti - T0/2f + (1 - T1)/2f;
                  
    //        // anticipation and overshoot for all keyframes
            
    //    //    t0 = T0;
    //      //  t1 = T1;
    //      //  v0 = V0;
    //       // v1 = V1;
          

    //        v0 -= GoalSpeeds[prevGoalKeyInd];
    //        v1 -= GoalSpeeds[nextGoalKeyInd];
    //        float s = TimingControl(t0,t1, ti, v0, v1, tp);

       
    //        //map s into the whole spline        		   
    //        float t = (s * (Keys[nextGoal].Time - Keys[prevGoal].Time) + Keys[prevGoal].Time);
    //        newKeyTimes[i] = t;


    //    }

    //    //Record original keytimes
    //    for (int i = 0; i < Keys.Length; i++) {
    //        originalKeyTimes[i] = Keys[i].Time;
    //        Keys[i].Time = newKeyTimes[i];
    //    }

    //    //Update interpolators
    //    InitInterpolators(Tval, Continuity, 0);
    //    //Reset key times back
    //    for (int i = 0; i < Keys.Length; i++)
    //        Keys[i].Time = originalKeyTimes[i];

    //}

    
    //t is between 0 and 1
    //Find the corresponding previous keyframe number at t
    //TODO: binary search
    public int FindKeyNumberAtNormalizedTime(float t) {
        if (t < 0 || t > 1) {
            Debug.Log("Incorrect time coefficient");
            return -1;
        }
  
        float appTime = t * AnimLength;
        for(int i = 0; i < Keys.Length-1; i++) {
            if (Keys[i].Time <= appTime && Keys[i + 1].Time > appTime)
                return i;
        }
        return Keys.Length - 1;
      
    /*    if (t == 1)
            return Keys.Length - 1;

        return Mathf.FloorToInt(t * Keys.Length);
    */
    }

    public int FindKeyNumberAtTime(float t) {

        
        for (int i = 0; i < Keys.Length - 1; i++) {
            if (Keys[i].Time <= t && Keys[i + 1].Time > t)
                return i;
        }
        return Keys.Length - 1;

    }


      public int FindFrameNumberAtTime(float t) {
        if (t < 0 || t > 1) {
            Debug.Log("Incorrect time coefficient");
            return -1;
        }

        //Compute it as in spline interpolation
        return (int) (t * FrameCnt);        
    }
      
    //index of the previous goal
    public int FindPrevGoalAtTime(float t) {
        for (int i = 0; i < GoalKeys.Count - 1; i++) {
            if (Keys[GoalKeys[i]].Time >= Keys[GoalKeys[GoalKeys.Count - 1]].Time)
                return GoalKeys.Count - 1;
            if (Keys[GoalKeys[i]].Time <= t && Keys[GoalKeys[i + 1]].Time > t)
                return i;
        }

        //return Keys.Length - 1;
        return GoalKeys.Count - 1;
     
    }

    public void UpdateKeypointsByShape(int arm) {
        

        bool passedCurves = false;
        for(int i = 0; i < Keys.Length ; i++) {
            if (UseCurveKeys == 1 && Keys[i].IsCurve) {
                //curve keys are fixed
                if (i > 0) {
                    passedCurves = true;
                }
                continue;
                
            }
            KeyInfo k = Keys[i];
            //initialize to original positions
            k.EePos[arm] = k.EePosOrig[arm];
            k.ShoulderPos[arm] = k.ShoulderPosOrig[arm];
            //Give shoulder position as a reference

            if(passedCurves) { //change direction after key point
                Hor = -Hor;
                Ver = -Ver;
                Sag = -Sag;
                passedCurves = false;
            }



            k.EePos[arm] = ArmShape(arm, k.EePos[arm], k.ShoulderPos[arm], k.RootForward);


            //Quaternion rot = Quaternion.FromToRotation(Vector3.forward, k.RootForward);

            
            //k.EePos[arm] = rot * k.EePos[arm];

            //k.EePos[arm] += k.ShoulderPos[arm];
        }

        InitInterpolators(Tval, Continuity, 0);
    }


    /// <summary>
    /// Update Arm Shape
    /// target: Keypoint to modify
    /// Returns modified keypoint
    /// </summary>
    Vector3 ArmShape(int arm, Vector3 target, Vector3 shoulderPos, Vector3 rootForward) {
        float rotTheta = 0f;        
        //Transform target from world space to local EMOTE coordinates
        //	targetLocal = transform.InverseTransformPoint(target);	
        //Translate to world

        
        target = target - shoulderPos;

        Quaternion rot = Quaternion.FromToRotation(rootForward, Vector3.forward);
        //Rotate to world forward direction
        Vector3 targetLocal = rot * target;

        

        // Convert to Emote coordinate system
        targetLocal = new Vector3(targetLocal.y, -targetLocal.z, targetLocal.x);

        //hor				
        float theta = Mathf.Atan(Abratio * targetLocal.y / -targetLocal.z);

        if (-targetLocal.z < 0)
            theta += Mathf.PI;
        if (theta < 0)
            theta += 2 * Mathf.PI;

        float a = -targetLocal.z / Mathf.Cos(theta);




        if (Hor == 0) {
            // WRONG! rotTheta = 0f;
            rotTheta = theta;
        }
          
        else if (Hor < 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Min(theta - Hor * MaxdTheta, Mathf.PI);
        }
        else if (Hor < 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Max(theta + Hor * MaxdTheta, Mathf.PI);
        }
        else if (Hor > 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Max(theta - Hor * MaxdTheta, 0);
        }
        else if (Hor > 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Min(theta + Hor * MaxdTheta, 2 * Mathf.PI);
        }
        
         
        float hdz = -(a * Mathf.Cos(rotTheta)) - targetLocal.z;
        float  hdy = (a * Mathf.Sin(rotTheta) / Abratio) - targetLocal.y;
            
        




        //sag
        theta = Mathf.Atan(Abratio * targetLocal.x / -targetLocal.y);


        if (targetLocal.y < 0)
            theta += Mathf.PI;
        if (theta < 0)
            theta += 2 * Mathf.PI;



        a = targetLocal.y / Mathf.Cos(theta);

        if (Sag == 0) {
            // WRONG! rotTheta = 0f;
            rotTheta = theta;
        }
        else if (Sag < 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Min(theta - Sag * MaxdTheta, Mathf.PI);
        }
        else if (Sag < 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Max(theta + Sag * MaxdTheta, Mathf.PI);
        }
        else if (Sag > 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Max(theta - Sag * MaxdTheta, 0);
        }
        else if (Sag > 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Min(theta + Sag * MaxdTheta, 2 * Mathf.PI);
        }


        float sdx = -(a * Mathf.Sin(rotTheta) / Abratio) - targetLocal.x;
        float sdy = (a * Mathf.Cos(rotTheta)) - targetLocal.y;


        //ver
        theta = Mathf.Atan(-Abratio * targetLocal.z / -targetLocal.x);
        if (-targetLocal.x < 0)
            theta += Mathf.PI;
        if (theta < 0)
            theta += 2 * Mathf.PI;

        a = -targetLocal.x / Mathf.Cos(theta);


        if (Ver == 0) {
            // WRONG! rotTheta = 0f;
            rotTheta = theta;
        }
        else if (Ver < 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Min(theta - Ver * MaxdTheta, Mathf.PI);
        }
        else if (Ver < 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Max(theta + Ver * MaxdTheta, Mathf.PI);
        }
        else if (Ver > 0f && 0 < theta && theta <= Mathf.PI) {
            rotTheta = Mathf.Max(theta - Ver * MaxdTheta, 0);
        }
        else if (Ver > 0f && Mathf.PI < theta && theta <= 2 * Mathf.PI) {
            rotTheta = Mathf.Min(theta + Ver * MaxdTheta, 2 * Mathf.PI);
        }


        float vdx = -(a * Mathf.Cos(rotTheta)) - targetLocal.x;
        float vdz = -(a * Mathf.Sin(rotTheta) / Abratio) - targetLocal.z;

        if (Mathf.Abs(sdx) < 0.0001f) sdx = 0f;
        if (Mathf.Abs(sdy) < 0.0001f) sdy = 0f;
        if (Mathf.Abs(vdx) < 0.0001f) vdx = 0f;
        if (Mathf.Abs(vdz) < 0.0001f) vdz = 0f;
        if (Mathf.Abs(hdy) < 0.0001f) hdy = 0f;
        if (Mathf.Abs(hdz) < 0.0001f) hdz = 0f;


        //Update keypoint position

        if (arm == 1) {
            sdx = -sdx;
        }

        targetLocal.x += sdx + vdx;
        targetLocal.y += sdy + hdy;
        targetLocal.z += hdz + vdz;


        //Transform target from local EMOTE space to world coordinates

        //	target = transform.TransformPoint(targetLocal);

        //Convert back to unity coordinate system
        targetLocal = new Vector3(targetLocal.z, targetLocal.x, -targetLocal.y);


        //Translate back to world coordinate
        //Rotate to world forward direction
        rot = Quaternion.FromToRotation(Vector3.forward, rootForward);
        target = rot * targetLocal;
        
        target = target + shoulderPos;
        //Rotate to world forward direction
        

        return target;

    }
	
   
    float TimingControl(float t0, float t1, float ti, float v0, float v1, float tp) {

        float area1 = 0f, area2 = 0f, area3 = 0f;
        float vel;

        
        float tpp = Mathf.Pow(tp, Texp);
        
        float tpp2 = tpp * tpp;
        float t02 = t0 * t0;
        float t12 = t1 * t1;
        float ti2 = ti * ti;
        float s = 0f;

 

        if (t0 == t1)
            _vi = 0f;
            //  _vi = (2f + 2f * v1 * t1 - v1 + v0 * ti - v1 * ti) / (t1 - t0);
        else
            _vi = (2f + v1 + v0 * ti - v1 * ti) / (t1 - t0);



        area1 = -0.5f * v0 * t0;
        if (t0 == ti)
            area2 = area1;
        else
            area2 = area1 + (-0.5f * (v0 + _vi) * ti2 + (v0 * ti + t0 * _vi) * ti - (-0.5f * (v0 + _vi) * t02 + (v0 * ti + t0 * _vi) * t0)) / (t0 - ti);

        if (t1 == ti)
            area3 = area2;
        else
            area3 = area2 + (-0.5f * (v1 + _vi) * t12 + (v1 * ti + t1 * _vi) * t1 - (-0.5f * (v1 + _vi) * ti2 + (v1 * ti + t1 * _vi) * ti)) / (t1 - ti);
        

        //Compute s
        if (tpp >= 0f && tpp < t0) {
            vel = (-v0 / t0) * tpp;
            s = 0.5f * (-v0 / t0) * tpp2;
        }
        else if (tpp >= t0 && tpp < ti) {
            vel = (-(v0 + _vi) * tpp + v0 * ti + t0 * _vi) / (t0 - ti);
            s = area1 + (-(v0 + _vi) * tpp2 * 0.5f + (v0 * ti + t0 *   _vi) * tpp - (-(v0 + _vi) * t02 * 0.5f + (v0 * ti + t0 * _vi) * t0)) / (t0 - ti);
        }
        else if (tpp >= ti && tpp < t1) {
            vel = (-(v1 + _vi) * tpp + v1 * ti + t1 * _vi) / (t1 - ti);
            s = area2 + (-(v1 + _vi) * tpp2 * 0.5f + (v1 * ti + t1 * _vi) * tpp - (-(v1 + _vi) * ti2 * 0.5f + (v1 * ti + t1 * _vi) * ti)) / (t1 - ti);
        }
        else if(tpp >= t1 && tpp < 1f) {
            vel = (-v1 * tpp + v1) / (t1 - 1f);
            s = area3 + (-v1 * tpp2 * 0.5f + v1 * tpp - (-v1 * t12 * 0.5f + v1 * t1)) / (t1 - 1f);

        }
        else if(tpp == 1f) {
           s = area3;
           vel = 0f;
        }

        else
            vel = s = 0f;
     
        
        return s;



    }

    
    public void ComputeUpdatedTimingParameters() {

        float t0, t1, ti, v0, v1;
        
        //No anticipation or overshoot except the first and the last keyframes
        if (PrevGoalKeyInd == 0) { //first
            t0 = T0;
            v0 = V0;
        }
        else {
            t0 = 0;
            v0 = 0;
        }

        if (PrevGoalKeyInd + 1 == GoalKeys.Count - 1) { //last
            t1 = T1;
            v1 = V1;
        }
        else {
            t1 = 1;
            v1 = 0;
        }
        //should shift Ti as well
        ti = Ti - T0 / 2f + (1 - T1) / 2f;
        /*

        // anticipation and overshoot for all keyframes
        t0 = T0;
        t1 = T1;
        v0 = V0;
        v1 = V1;
        */

        /*
        v0 -= GoalSpeeds[PrevGoalKeyInd];


        
        if (PrevGoalKeyInd + 1 < GoalKeys.Count)
            v1 -= GoalSpeeds[PrevGoalKeyInd + 1];
        
   */

        if (GetComponent<IKAnimator>().LockHand && NormalizedT > GetComponent<IKAnimator>().LockBegin && NormalizedT < GetComponent<IKAnimator>().LockEnd) {

            if(AnimName.ToUpper().Contains("HANDSHAKE")){
                v0 -= 1f;
                v1 -= 1f;
            }
 
                
        }
        else {
            v0 -= GoalThreshold;
            v1 -= GoalThreshold;
        }

        float s = TimingControl(t0, t1, ti, v0, v1, Tp);


        //map s into the whole spline

        GlobalT = (s * (NextGoal - PrevGoal) + PrevGoal) / AnimLength;

        
        if (NextGoal == PrevGoal)
            GlobalT = 1f;

        if (GlobalT < 0) {
            CurrKeyInd = FindKeyNumberAtNormalizedTime(-GlobalT); //find an imaginary key before the start of keyframes         
            if (CurrKeyInd + 1 < Keys.Length)
                LocalT = (float)(-GlobalT * AnimLength - Keys[CurrKeyInd].Time) / (Keys[CurrKeyInd + 1].Time - Keys[CurrKeyInd].Time);
            else
                LocalT = 0;
        }
        else if (GlobalT > 1) {
            CurrKeyInd = FindKeyNumberAtNormalizedTime(2 - GlobalT); //find an imaginary key beyond the keyframes   1 - ( t - 1)       
            if (CurrKeyInd + 1 < Keys.Length)
                LocalT = (float)((2 - GlobalT) * AnimLength - Keys[CurrKeyInd].Time) / (Keys[CurrKeyInd + 1].Time - Keys[CurrKeyInd].Time);
            else
                LocalT = 0;
        }
        else {
            CurrKeyInd = FindKeyNumberAtNormalizedTime(GlobalT); //including via keys
            if (CurrKeyInd + 1 < Keys.Length) {
                LocalT = (float)(GlobalT * AnimLength - Keys[CurrKeyInd].Time) / (Keys[CurrKeyInd + 1].Time - Keys[CurrKeyInd].Time);             
            }
            else
                LocalT = 0;
        }
        

        
    }

    // private void Update() {
    //     if (IsPlaying())
    //             _animator.applyRootMotion = true;
    //     else
    //             _animator.applyRootMotion = false;

    // }

    //todo: was fixedupdate, but fixedupdate is called after ikanimator.lateupdate????
    void LateUpdate() {
        if(!IsPlaying())
            return;

        ComputeUpdatedTimingParameters();
        
    }

}

