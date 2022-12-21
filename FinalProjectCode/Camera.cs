using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Camera : MonoBehaviour
{
    public Transform Player;

    public float MaxX;

    public float MinX;
    // Start is called before the first frame update
   

    // Update is called once per frame
    void Update()
    {
        Vector3 newPos = new Vector3(Player.position.x, transform.position.y, transform.position.z);
        newPos.x = Mathf.Clamp(newPos.x, MinX, MaxX);
        transform.position = newPos;
    }
}
