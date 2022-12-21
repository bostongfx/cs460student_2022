using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Damageable : MonoBehaviour
{
    public Animator animator;
    [SerializeField]
    public int _maxHealth = 10;

    public int MaxHealth
    {
        get
        {
            return _maxHealth;
        }
        set
        {
            _maxHealth = value;
        }
    }
    [SerializeField]
    private int _health = 100;

    public int Health
    {
        get
        {
            return _health;

        }
        set
        {
            _health = value;
            if(_health < 0)
            {
                IsAlvie = false;
            }
        }
    }

    [SerializeField]
    private bool _isAlive = true;

    [SerializeField, HideInInspector]
    private bool isInvincible = false;
    private float timeSinceHit=0;
    public float invincibilityTime = 0.25f;

    public bool IsAlvie
    {
        get
        {
            return _isAlive;
        }

        set
        {
            _isAlive = value;
            animator.SetBool(PAP.isAlive, value);
            Debug.Log("IsAlvie set" + value);
        }
    }


    private void Awake()
    {
        animator = GetComponent<Animator>();
    }
    private void Updata()
    {
        if(isInvincible)
        {
            if(timeSinceHit > invincibilityTime)
            {
                isInvincible = false;
                timeSinceHit = 0;
            }
            timeSinceHit += Time.deltaTime;
        }
        Hit(10);
    }

    public void Hit(int damage)
    {
        if(IsAlvie && !isInvincible)
        {
            Health -= damage;
            isInvincible = true;
        }
    }
}
