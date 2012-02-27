<?php
namespace LunchTime\DeliveryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use LunchTime\DeliveryBundle\Entity\Menu;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;

class MenuFixtures extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $this->addReference('menu-today', $menu);

        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $menu = new Menu();
        $menu->setDueDate(new \DateTime());
        $manager->persist($menu);

        $manager->flush();
    }

    public function getOrder()
    {
        return 1;
    }

}