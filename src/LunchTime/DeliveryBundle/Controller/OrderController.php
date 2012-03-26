<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    /**
     * @Route("/order")
     */
    public function indexAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $orders = $em->getRepository('LTDeliveryBundle:Client\Order')->getListWithItemsQuery()
            ->getResult();

        $_orders = array();
        foreach ($orders as $order) {
            $_orders[] = $this->serializeOrder($order);
        }

        return new Response(json_encode($_orders));
    }

    /**
     * @Route("/order/item")
     * @Method("GET")
     */
    public function itemsAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $items = $em->getRepository('LTDeliveryBundle:Client\Order\Item')->getListQuery()
            ->getResult();

        $_items = array();
        foreach ($items as $item) {
            $_items[] = $this->serializeItem($item);
        }

        return new Response(json_encode($_items));
    }
    /**
     * @Route("/order/item")
     * @Method("POST")
     */
    public function createItemAction()
    {

    }

    protected function serializeOrder($order)
    {
        $items = $order->getItems()->map(function ($item) {
            return $item->getId();
        });

        return array(
            'id'       => $order->getId(),
            'due_date' => $order->getDueDate()->format('Y-m-d H:i:s'),
            'items'    => $items->toArray(),
        );
    }

    protected function serializeItem($item)
    {
        return array(
            'id'           => $item->getId(),
            'menu_item_id' => $item->getMenuItem()->getId(),
            'amount'       => $item->getAmount(),
            'order_id'     => $item->getOrder()->getId(),
        );
    }

}
