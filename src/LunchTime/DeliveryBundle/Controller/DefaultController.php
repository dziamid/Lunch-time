<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $menus = $em->getRepository('LTDeliveryBundle:Menu')->getListWithItemsQuery()
            ->getResult();

        $_menus = array();
        foreach ($menus as $menu) {
            $_menus[] = $this->serializeMenu($menu);

        }
        return $this->render('LTDeliveryBundle:Default:index.html.twig', array(
            'menus' => $_menus
        ));
    }

    protected function serializeMenu($menu)
    {
        $items = $menu->getItems()->map(function ($item) {
            return array(
                'id' => $item->getId(),
                'title' => $item->getTitle(),
                'price' => $item->getPrice()
            );
        });

        return array(
            'id' => $menu->getId(),
            'date' => $menu->getDueDate()->format('Y-m-d H:i:s'),
            'items' => $items->toArray(),
        );
    }

}
