using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Hit : MonoBehaviour

{
    public int Health = 2;
    public Animator animator;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag.Equals("Bullet") && Health != 0)
        {
            Health -= 1;
            animator.SetTrigger("Hit");
        }
        else if (Health == 0)
        {
            Destroy(gameObject);
        }
        }
    }
