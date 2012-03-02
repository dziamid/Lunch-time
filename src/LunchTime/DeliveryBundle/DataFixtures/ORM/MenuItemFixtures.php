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
        //MENU1
        $menu1 = $this->getReference('menu-1');

        $item = new Item();
        $item->setTitle('Борщ');
        $item->setMenu($menu1);
        $manager->persist($item);
        $this->addReference('menu-item-1', $item);

        $item = new Item();
        $item->setTitle('Щи');
        $item->setMenu($menu1);
        $manager->persist($item);
        $this->addReference('menu-item-2', $item);

        $item = new Item();
        $item->setTitle('Рот полощи');
        $item->setMenu($menu1);
        $manager->persist($item);
        $this->addReference('menu-item-3', $item);

        //MENU2
        $menu2 = $this->getReference('menu-2');
        $item = new Item();
        $item->setTitle('Салат');
        $item->setMenu($menu2);
        $manager->persist($item);
        $this->addReference('menu-item-4', $item);

        $item = new Item();
        $item->setTitle('Куй звезда');
        $item->setMenu($menu2);
        $manager->persist($item);
        $this->addReference('menu-item-5', $item);

        $manager->flush();
    }

    public function getOrder()
    {
        return 2;
    }

}