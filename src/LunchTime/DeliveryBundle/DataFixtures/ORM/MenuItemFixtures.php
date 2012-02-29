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
        $menu1 = $this->getReference('menu-1');
        $menu2 = $this->getReference('menu-2');

        $titles = array('Борщ', 'Щи', 'Рот полощи', 'Салат', 'Ещё салат', 'Куй звезда');
        foreach($titles as $title) {
            $item = new Item();
            $item->setTitle($title);
            $item->setMenu($menu1);
            $manager->persist($item);
        }

        foreach($titles as $title) {
            $item = new Item();
            $item->setTitle($title);
            $item->setMenu($menu2);
            $manager->persist($item);
        }


        $manager->flush();
    }

    public function getOrder()
    {
        return 2;
    }

}