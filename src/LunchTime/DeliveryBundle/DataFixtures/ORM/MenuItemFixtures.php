<?php
namespace LunchTime\DeliveryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use LunchTime\DeliveryBundle\Entity\Menu\Item;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;

class MenuItemFixtures extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $menuToday = $this->getReference('menu-today');

        $item = new Item();
        $item->setTitle('Борщ');
        $item->setMenu($menuToday);
        $manager->persist($item);

        $item = new Item();
        $item->setTitle('Макароны по флотски');
        $item->setMenu($menuToday);
        $manager->persist($item);

        $manager->flush();
    }

    public function getOrder()
    {
        return 2;
    }

}