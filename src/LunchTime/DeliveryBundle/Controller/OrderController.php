<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Common\Collections\ArrayCollection;

use LunchTime\DeliveryBundle\Entity\Client\Order;
use LunchTime\DeliveryBundle\Form\Client\OrderType;

class OrderController extends Controller
{

    /**
     * @Route(name="orderBaseUrl", pattern="/order")
     * @Method("POST")
     */
    public function createAction()
    {
        /** @var $em \Doctrine\ORM\EntityManager */
        $em = $this->getDoctrine()->getEntityManager();
        $orderJson = $this->getRequest()->getContent();

        $order = $this->get('serializer')->deserialize($orderJson, 'LunchTime\DeliveryBundle\Entity\Client\Order', 'json');
        $em->persist($order);
        //right now em is not aware of any deserialized entities
        //so it will treat all of them as being new
        //to correctly save the graph we need to load those entities that are not new
        //in this particular case - menu items
        foreach ($order->getItems() as $item) {
            $menuItem = $em->find('LTDeliveryBundle:Menu\Item', $item->getMenuItem()->getId());
            $item->setMenuItem($menuItem);
            $em->persist($item);
        }

        $em->flush();

        return new Response(json_encode(array('success' => true)));

    }


}
