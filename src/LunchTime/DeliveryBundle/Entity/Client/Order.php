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
}