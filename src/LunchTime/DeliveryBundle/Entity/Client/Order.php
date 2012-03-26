<?php

namespace LunchTime\DeliveryBundle\Entity\Client;

use Doctrine\ORM\Mapping as ORM;

/**
 * LunchTime\DeliveryBundle\Entity\Client\Order
 *
 * @ORM\Table(name="ClientOrder")
 * @ORM\Entity(repositoryClass="LunchTime\DeliveryBundle\Entity\Client\OrderRepository")
 */
class Order
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
     * @ORM\OneToMany(targetEntity="\LunchTime\DeliveryBundle\Entity\Client\Order\Item", mappedBy="order")
     */
    private $items;

    /**
     * @var date $due_date
     *
     * @ORM\Column(name="due_date", type="date")
     */
    private $due_date;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }


    public function __construct()
    {
        $this->items = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function __toString()
    {
        return (string)$this->id;
    }
    
    /**
     * Add items
     *
     * @param LunchTime\DeliveryBundle\Entity\Client\Order\Item $items
     */
    public function addItem(\LunchTime\DeliveryBundle\Entity\Client\Order\Item $items)
    {
        $this->items[] = $items;
    }

    /**
     * Get items
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * Set due_date
     *
     * @param date $dueDate
     */
    public function setDueDate($dueDate)
    {
        $this->due_date = $dueDate;
    }

    /**
     * Get due_date
     *
     * @return date 
     */
    public function getDueDate()
    {
        return $this->due_date;
    }
}