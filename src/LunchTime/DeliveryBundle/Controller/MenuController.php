<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends Controller
{
    /**
     * @Route("/menu")
     */
    public function indexAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $menus = $em->getRepository('LTDeliveryBundle:Menu')->getListWithItemsQuery()
            ->getArrayResult();
        foreach ($menus as &$menu) {
            //format date into javascript Date parsable format
            //'October 13, 1975 11:13:00' for mysql's datetime
            //'October 13, 1975' for mysql's date
            //$menu['due_date'] = (string)$menu['due_date']->format('F j, Y');
            $menu['due_date'] = $menu['due_date']->format('Y-m-d H:i:s');
        }


        return new Response(json_encode($menus));
    }

    /**
     * @Route("/menu/item")
     */
    public function itemsAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $items = $em->getRepository('LTDeliveryBundle:Menu\Item')->getListQuery()
            ->getArrayResult();

        return new Response(json_encode($items));
    }
}
