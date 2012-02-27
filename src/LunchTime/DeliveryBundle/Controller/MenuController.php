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

        $menus = $em->getRepository('LTDeliveryBundle:Menu')->getListQuery()
            ->getArrayResult();

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
