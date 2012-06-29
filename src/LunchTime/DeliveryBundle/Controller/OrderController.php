<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Common\Collections\ArrayCollection;

use LunchTime\DeliveryBundle\Entity\Client\Order;

class OrderController extends Controller
{

    /**
     * @Route(name="orderBaseUrl", pattern="/order")
     * @Method("POST")
     */
    public function persistAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();

        $_order = json_decode($this->getRequest()->getContent(), true);
        $order = $_order['id'] !== null ? $em->find('LTDeliveryBundle:Client\Order', $_order['id']) : new Order();
        $order->setDueDate(new \DateTime($_order['date']));
        $em->persist($order);

        foreach ($_order['items'] as $_item) {
            $item = $_order['id'] !== null ? $em->find('LTDeliveryBundle:Client\Order\Item', $_item['id']) : new Order\Item();
            $item->setAmount($_item['amount']);
            $item->setOrder($order);

            $_menuItem = $_item['menu_item'];
            $menuItem = $em->find('LTDeliveryBundle:Menu\Item', $_menuItem['id']);
            $item->setMenuItem($menuItem);
            $em->persist($item);
        }

        $em->flush();

        return new Response(json_encode(array('success' => true)));

    }


}
