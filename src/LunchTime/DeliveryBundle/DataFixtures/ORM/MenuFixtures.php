<?php
namespace LunchTime\DeliveryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use LunchTime\DeliveryBundle\Entity\Menu;
use Doctrine\Common\Persistence\ObjectManager;


class MenuFixtures implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $manager->flush();
    }

}