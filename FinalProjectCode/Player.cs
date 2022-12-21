using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Player : MonoBehaviour
{

    public Animator animator;
    public float groundCheckDistance = 0.1f;
    public float wallRaycastDistance = 0.6f;

    public ContactFilter2D groundCheckFilter;

    private Rigidbody2D rb;
    private Collider2D collider2d;

    private List<RaycastHit2D> groundHits = new List<RaycastHit2D>();

    private List<RaycastHit2D> wallHits = new List<RaycastHit2D>();

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        collider2d = GetComponent<Collider2D>();
    }

    // Update is called once per frame
    void Update()
    {
        float moveX = Input.GetAxisRaw(PAP.axisXinput );

        animator.SetFloat(PAP.moveX, moveX);
        bool isMoving = Mathf.Approximately(moveX, 0f);

        animator.SetBool(PAP.isMoving, isMoving);

        bool lastOnGround = animator.GetBool(PAP.isOnGround);
        bool newOnGround = CheckIfOnGround();
        animator.SetBool(PAP.isOnGround, newOnGround);

        if(lastOnGround == false && newOnGround == true)
        {
            animator.SetTrigger(PAP.landedOnGround);
        }
        else
        {
            animator.ResetTrigger(PAP.landedOnGround);
        }

        bool onWall = CheckIfOnWall();
        animator.SetBool(PAP.isOnWall, onWall);

        bool isJumpKeyPressed = Input.GetButtonDown(PAP.jumpKeyName);

        if (isJumpKeyPressed)
        {
            animator.SetTrigger(PAP.JumpTriggerName);

        }

    }
    void FixedUpdate()
    {
        float forceX = animator.GetFloat(PAP.forceX);

        if (forceX != 0) rb.AddForce(new UnityEngine.Vector2(forceX, 0) * Time.deltaTime);

        float impulseY = animator.GetFloat(PAP.impulseY);
        float impulseX = animator.GetFloat(PAP.impulseX);

        if (impulseY != 0 || impulseX != 0)
        {
            float xDirectionSign = Mathf.Sign(transform.localScale.x);
       

            

            rb.AddForce(new UnityEngine.Vector2(xDirectionSign *impulseX,impulseY), ForceMode2D.Impulse);
            animator.SetFloat(PAP.impulseY, 0);
            animator.SetFloat(PAP.impulseY, 0);
        }
        animator.SetFloat(PAP.velocityY, rb.velocity.y);

        bool isStopVelocity = animator.GetBool(PAP.stopVelocity);

        if (isStopVelocity)
        {
            rb.velocity = UnityEngine.Vector2.zero;
            animator.SetBool(PAP.stopVelocity, false);
        }

    }
    bool CheckIfOnGround()
    {
        collider2d.Cast(UnityEngine.Vector2.down, groundCheckFilter, groundHits, groundCheckDistance);

        if(groundHits.Count > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    bool CheckIfOnWall()
    {
        UnityEngine.Vector2 localScale = transform.localScale;
        collider2d.Raycast(Mathf.Sign(localScale.x) * UnityEngine.Vector2.right, groundCheckFilter, wallHits, wallRaycastDistance);

        if(wallHits.Count > 0)
        {
            return true;

        }
        else
        {
            return false;
        }
    }
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Gold")
        {
            Destroy(collision.gameObject);
        }
        else if (collision.gameObject.tag == "WinObject")
        {
            int currLV = SceneManager.GetActiveScene().buildIndex;

            if (currLV == SceneManager.sceneCountInBuildSettings - 1)
            {
                SceneManager.LoadScene(0);

            }
            else
            {
                SceneManager.LoadScene(currLV + 1);
            }
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {

        if (collision.gameObject.tag == "Enemy")
        {
            animator.SetTrigger("Hit");
            Destroy(GetComponent<CapsuleCollider2D>());
            Invoke("GameOver", 3.5f);
        }
    }

    public void GameOver()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    }
    

