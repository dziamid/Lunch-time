<?php

namespace LunchTime\DeliveryBundle\Entity\Client\Order;

use Doctrine\ORM\Mapping as ORM;

/**
 * LunchTime\DeliveryBundle\Entity\Client\Order\Item
 *
 * @ORM\Table(name="ClientOrderItem")
 * @ORM\Entity(repositoryClass="LunchTime\DeliveryBundle\Entity\Client\Order\ItemRepository")
 */
class Item
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer $amount
     *
     * @ORM\Column(name="amount", type="integer")
     */
    private $amount;

    /**
     * @ORM\ManyToOne(targetEntity="\LunchTime\DeliveryBundle\Entity\Client\Order", inversedBy="items")
     */
    private $order;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set amount
     *
     * @param integer $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * Get amount
     *
     * @return integer 
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set order
     *
     * @param LunchTime\DeliveryBundle\Entity\Client\Order $order
     */
    public function setOrder(\LunchTime\DeliveryBundle\Entity\Client\Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get order
     *
     * @return LunchTime\DeliveryBundle\Entity\Client\Order 
     */
    public function getOrder()
    {
        return $this->order;
    }
}