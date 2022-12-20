
using System;
using System.Linq;
using UnityEngine;
using System.IO;
using UnityEngine.SceneManagement;
using System.Collections;
using System.Collections.Generic;
using Siccity.GLTFUtility;

/// <summary>
/// GUI functions to tune character personality
/// </summary>
public class ParamGUI : GUIController {
    RaycastHit _hit;

    int _agentSelInd;


    private float[] _personality = new float[5]; //-1 0 1 
    private string[] _personalityName = { "O", "C", "E", "A", "N" };

    private int _persMin = -1;
    private int _persMax = 1;

    

    private PersonalityMapper _persMapper;

    private AnimationInfo[] _agentScripts;


    private int prevAnimInd;
    private DropDownRect _dropDownRectAnimNames;
    private DropDownRect _dropDownRectAgents;

    bool _firstRun = true;
    

  


    private void Start() {


        _agentScripts = transform.GetComponentsInChildren<AnimationInfo>();

        _dropDownRectAgents = new DropDownRect(new Rect(115, 20, 90, 300));
        _dropDownRectAnimNames = new DropDownRect(new Rect(210, 20, 90, 300));


        _firstRun = true;

        _agentSelInd = 0;


        _persMapper = new PersonalityMapper();




        foreach (AnimationInfo t in _agentScripts){

            //t.GetComponent<BVHRecorder>().enabled = false;
            t.GetComponent<BVHRecorder>().capturing = false;
            Reset(t);
        }

        //   FormatData("motionEffortCoefs.txt");

        MathDefs.SetSeed(30);

    }



    void Update() {
        _agentScripts = transform.GetComponentsInChildren<AnimationInfo>();
        if (_firstRun) {
            _persMapper.ComputeMotionEffortCoefs();
            _firstRun = false; //no need to compute again
        }


        if(Input.GetKeyDown("0"))
            Time.timeScale = 0;
        else if(Input.GetKeyDown("1"))
            Time.timeScale = 1f;
        else if(Input.GetKeyDown("2"))
            Time.timeScale = 2f;
        else if(Input.GetKeyDown("3"))
            Time.timeScale = 3f;
        else if(Input.GetKeyDown("4"))
            Time.timeScale = 4f;


        if(Input.GetMouseButtonDown(0)) {

            if(Camera.main != null) {
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                Physics.Raycast(ray, out _hit);
                if(_hit.collider) {
                    for(int i = 0; i < _agentScripts.Length; i++) {
                        if(_hit.collider.transform.parent && _agentScripts[i].gameObject.Equals(_hit.collider.transform.parent.gameObject)) {
                            _agentSelInd = i;

                            break;
                        }
                    }
                }

            }

        }
    }

    //Runtime import of gltf
    void ImportGLTFAsync(string filepath) {
        Importer.ImportGLTFAsync(filepath, new ImportSettings(), OnFinishAsync);
    }

    void OnFinishAsync(GameObject result, AnimationClip[] animations) {
        Debug.Log("Finished importing " + result.name);
    }

    private void OnGUI() {

        _agentScripts = transform.GetComponentsInChildren<AnimationInfo>();
        GUI.color = Color.white;
   
        
        GUILayout.BeginArea(_dropDownRectAnimNames.DdRect);
        GUILayout.Label("Animation");
        
        _dropDownRectAnimNames.DdList = _agentScripts[_agentSelInd].GetAnimNames();
        int ind = _dropDownRectAnimNames.ShowDropDownRect();
        if(ind != prevAnimInd) {
            _agentScripts[_agentSelInd].ChangeAnimation(_dropDownRectAnimNames.DdList[ind]);
            prevAnimInd = ind;
        }
        
        GUILayout.EndArea();
        


        GUILayout.BeginArea(new Rect(5, 20, 105, Screen.height));



        GUILayout.Label("Personality");
        GUI.color = Color.white;

        GUILayout.Label("");
        for(int i = 0; i < 5; i++) {
            GUILayout.BeginHorizontal();
            GUILayout.Label("" + _persMin);
            GUILayout.Label("" + _personalityName[i]);
            GUILayout.Label("" + _persMax);
            GUILayout.EndHorizontal();

            _personality[i] = _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Personality[i];
            GUI.color = Color.white;



            GUI.backgroundColor = Color.white;
            _personality[i] = GUILayout.HorizontalSlider(_personality[i], _persMin, _persMax).Truncate(1);

            //Assign agent personality
            _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Personality[i] = _personality[i];


            string[] ocean = { "O", "C", "E", "A", "N" };
            for(int j = 0; j < 5; j++) {
                if(_agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Personality[j] == -1)
                    ocean[j] += "-";
                else if(_agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Personality[j] == 1)
                    ocean[j] += "+";
                else
                    ocean[j] = "";
            }

        }


        GUI.color = Color.white;

   

        if(GUILayout.Button("Reset scene"))
            SceneManager.LoadScene("MotionSelection");

        if(GUILayout.Button("Reset Personality")) {
            foreach(AnimationInfo a in _agentScripts)
                for(int i = 0; i < 5; i++)
                    a.GetComponent<PersonalityComponent>().Personality[i] = 0;
        }

      
        
        if (GUILayout.Button("Change model"))
        {
            ImportGLTFAsync("prefabs/test_obj.gltf");
            GameObject go =  Resources.Load<GameObject>("prefabs/James");
            //GameObject go =  Resources.Load<GameObject>("prefabs/Louise");
            foreach (AnimationInfo t in _agentScripts)
            {
                t.ChangeModel(go);
            }
        }

        if (GUILayout.Button("Add animation"))
        {
            

            var clip = Resources.Load<AnimationClip>("prefabs/Remy@Defeated");
            foreach (AnimationInfo t in _agentScripts)
            {
                
                    t.AnimationClips.Add((AnimationClip)clip);
                    
                
            }
        }



        if (GUILayout.Button("Play")) {
            foreach (AnimationInfo t in _agentScripts)            
                _persMapper.MapPersonalityToMotion(t.GetComponent<PersonalityComponent>()); //calls initkeypoints, which stops the animation

            PlayAgents();
          
        }


        if(GUILayout.Button("Stop"))
            StopAgents();



        //if(GUILayout.Button("Record")) {
        //    GameObject.Find("Main Camera").GetComponent<Screenshot>().IsRunning = true;

        //    Time.timeScale = 0.25f;

        //    PlayAgentsForCapture();

        //    foreach (AnimationInfo t in _agentScripts)
        //        t.GetComponent<BVHRecorder>().capturing = true;

        //}


        if (GUILayout.Button("CaptureBVHDrives"))
            StartCoroutine(CaptureDrives());

        
        if (GUILayout.Button("CaptureBVHPersonality"))
            StartCoroutine(CapturePersonalityCombinations());


        

        //we need to update after play because playanim resets torso parameters for speed etc. when animinfo is reset

        GUI.color = Color.yellow;
        GUILayout.Label("S:" + _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Effort[0] + " W:" + _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Effort[1] + " T:" +
            _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Effort[2] + " F:" + _agentScripts[_agentSelInd].GetComponent<PersonalityComponent>().Effort[3]);

        GUILayout.EndArea();

    }


    int pDecimal = 0;
    float[] pValues = { -1f, -0.5f,   0,  0.5f,  1f };
    

    private IEnumerator WaitForAnimation(AnimationInfo a) {
      
        while(a.IsPlaying()) {          
            yield return null;            
        }
        
        // at this point, the animation has completed
        // so at this point, do whatever you wish...
        Debug.Log("Animation completed");
        a.GetComponent<BVHRecorder>().capturing = false;        
        a.GetComponent<BVHRecorder>().saveBVH();        

        pDecimal++;

    }


    IEnumerator CapturePersonalityCombinations() {
        AnimationInfo a = _agentScripts[0];        

        while(pDecimal < Math.Pow(pValues.Length, 5)) { //combinations of -1, 0, 1 for the 5 personalities

            ResetComponents(a);

            List<int> pInds = MathDefs.convertToNary(pDecimal, 5, 5);

            for(int i = 0; i < 5; i++)
                a.GetComponent<PersonalityComponent>().Personality[i] = pValues[pInds[i]];

            
            _persMapper.MapPersonalityToMotion(a.GetComponent<PersonalityComponent>()); //calls initkeypoints, which stops the animation

            //a.GetComponent<BVHRecorder>().enabled = true;

            a.GetComponent<BVHRecorder>().clearCapture();

            Play(a);

            
            a.GetComponent<BVHRecorder>().filename = String.Format("out/personality/{0}_{1}_{2}_{3}_{4}_{5}", a.AnimName, pValues[pInds[0]], pValues[pInds[1]], pValues[pInds[2]], pValues[pInds[3]], pValues[pInds[4]]);
            Debug.Log(String.Format("{0} {1} {2} {3} {4}", pValues[pInds[0]], pValues[pInds[1]], pValues[pInds[2]], pValues[pInds[3]], pValues[pInds[4]]));
            a.GetComponent<BVHRecorder>().capturing = true;


            yield return StartCoroutine(WaitForAnimation(a));
        }


    }


    

    IEnumerator CaptureDrives() {
        AnimationInfo a = _agentScripts[0];

        //Animation animation = a.GetComponent<Animation>();

        //while(animation.isPlaying)
        //yield return null;

        while(pDecimal < 32) { //32 Drives


            ResetComponents(a);

            
            UpdateEmoteParams(a, pDecimal);


            Debug.Log(a.AnimSpeed);

            //a.GetComponent<BVHRecorder>().enabled = true;
            a.GetComponent<BVHRecorder>().clearCapture();

            Play(a);


            DriveParams driveParams = new DriveParams(pDecimal);
            a.GetComponent<BVHRecorder>().filename = String.Format("out/effort/{0}_{1}_{2}_{3}_{4}", a.AnimName, driveParams.Space, driveParams.Weight, driveParams.Time, driveParams.Flow);
            a.GetComponent<BVHRecorder>().capturing = true;


            yield return StartCoroutine(WaitForAnimation(a));
        }


    }



    void PlayAgents()
    {
        foreach (AnimationInfo t in _agentScripts)
        {

            ResetComponents(t);            

            Play(t);

        }

        _persMapper.MapAnimSpeeds(_agentScripts, 0.6f, 1.3f); //map them to the range

    }

    void PlayAgentsForCapture() {
        

        foreach (AnimationInfo t in _agentScripts) {

            ResetComponents(t);


            //_persMapper.MapPersonalityToMotion(t.GetComponent<PersonalityComponent>()); //calls initkeypoints, which stops the animation
  
            Play(t);

            StartCoroutine(WaitForAnimation(t));
         

            GUI.color = Color.white;
        
        }

        _persMapper.MapAnimSpeeds(_agentScripts, 0.6f, 1.3f); //map them to the range
    }

    void StopAgents() {
        foreach(AnimationInfo t in _agentScripts) {
            StopAnimations(t);
            StopBVHCapturing(t);
        }
    }

        void RecordPersonalities() {
        using (StreamWriter sw = new StreamWriter("Assets/Resources/personalities.txt")) {
            foreach (AnimationInfo a in _agentScripts) {
                sw.WriteLine(a.CharacterName + "\t" + a.GetComponent<PersonalityComponent>().Personality[0] + "\t" +
                             a.GetComponent<PersonalityComponent>().Personality[1] + "\t" + a.GetComponent<PersonalityComponent>().Personality[2] + "\t" + a.GetComponent<PersonalityComponent>().Personality[3] + "\t" +
                             a.GetComponent<PersonalityComponent>().Personality[4]);
            }
        }
    }

    void LoadPersonalities() {
        using (StreamReader sr = new StreamReader("Assets/Resources/personalities.txt")) {
            foreach (AnimationInfo a in _agentScripts) {
                string s = sr.ReadLine();
                String[] p = s.Split('\t');
                for (int i = 0; i < 5; i++)
                    a.GetComponent<PersonalityComponent>().Personality[i] = float.Parse(p[i + 1]);

            }
        }

    }

}

