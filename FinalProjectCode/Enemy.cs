using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    private Animator animator;
    private int dir = 1;
    private float startPosX;
    private bool isHit = false;
    private int health = 10;

    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponent<Animator>();
        startPosX = transform.position.x;

    }

    // Update is called once per frame
    void Update()
    {
        if(isHit)
        {
            return;
        }
        transform.Translate(transform.right * Time.deltaTime * 0.4f * dir);

        if (transform.position.x > startPosX + 0.5)
            {
            dir = dir * -1;
            GetComponent<SpriteRenderer>().flipX = false;
        }
        else if(transform.position.x <startPosX - 0.5f)
        {
            dir = dir * -1;
            GetComponent<SpriteRenderer>().flipX = true;
        }
    }
    private void OntriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.tag =="Player")
        {
            animator.SetTrigger("Hit");
            transform.position = new Vector3(transform.position.x, transform.position.y - 0.0387F, 0);
            isHit = true;
            BoxCollider2D[] collider2Ds;
            collider2Ds = GetComponents<BoxCollider2D>();
            foreach (var item in collider2Ds)
            {
                Destroy(item);
            }
            Destroy(GetComponent<Rigidbody2D>());
            Destroy(gameObject, 1F);
        }
        if(collision.gameObject.tag == "Bullet")
        {
            health--;
            if (health <= 0)

                Destroy(gameObject, 1F);
            
        }
    }
}
