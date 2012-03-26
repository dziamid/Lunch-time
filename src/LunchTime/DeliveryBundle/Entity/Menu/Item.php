<?php

namespace LunchTime\DeliveryBundle\Entity\Menu;

use Doctrine\ORM\Mapping as ORM;

/**
 * LunchTime\DeliveryBundle\Entity\Menu\Item
 *
 * @ORM\Table(name="MenuItem")
 * @ORM\Entity(repositoryClass="LunchTime\DeliveryBundle\Entity\Menu\ItemRepository")
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
     * @var string $title
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="\LunchTime\DeliveryBundle\Entity\Menu", inversedBy="items")
     */
    private $menu;

    public function __toString()
    {
        return (string)$this->title;
    }

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
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set menu
     *
     * @param LunchTime\DeliveryBundle\Entity\Menu $menu
     */
    public function setMenu(\LunchTime\DeliveryBundle\Entity\Menu $menu)
    {
        $this->menu = $menu;
    }

    /**
     * Get menu
     *
     * @return LunchTime\DeliveryBundle\Entity\Menu 
     */
    public function getMenu()
    {
        return $this->menu;
    }
}