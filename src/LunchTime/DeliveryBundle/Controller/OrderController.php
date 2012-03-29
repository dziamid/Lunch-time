<?php

namespace LunchTime\DeliveryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;

use LunchTime\DeliveryBundle\Entity\Client\Order\Item;

use LunchTime\DeliveryBundle\Form\Client\Order\ItemType;
use Doctrine\Common\Collections\ArrayCollection;

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
    public function createItemsAction()
    {
        $em = $this->getDoctrine()->getEntityManager();

        $_items = json_decode($this->getRequest()->getContent(), true);
        $items = new ArrayCollection();
        foreach ($_items as $_item) {
            $item = new Item();
            $form = $this->createForm(new ItemType(), $item);
            $form->bind($_item);
            if ($form->isValid()) {
                $em->persist($item);
                $items->add($item);
            }
        }
        $em->flush();

        $_items = $this->serializeItems($items);
        return new Response(json_encode($_items));

    }

    /**
     * @Route("/order/item")
     * @Method("PUT")
     */
    public function updateItemsAction()
    {
        $em = $this->getDoctrine()->getEntityManager();

        $_items = json_decode($this->getRequest()->getContent(), true);
        $_ids = array_map(function ($item)
        {
            return $item['id'];
        }, $_items);

        $items = $em->getRepository('LTDeliveryBundle:Client\Order\Item')->getListByIds($_ids)
            ->getResult();

        foreach ($_items as $_item) {
            $item = array_filter($items, function($item) use ($_item)
            {
                return $item->getId() == $_item['id'];
            });
            $item = array_shift($item);
            if (false == $item) {
                //don't update items that are not present
                //may occur if item is already deleted
                continue;
            }

            $form = $this->createForm(new ItemType(), $item);
            unset($_item['id']);
            $form->bind($_item);
            if ($form->isValid()) {
                $em->persist($item);
            }
        }
        $em->flush();

        $_items = $this->serializeItems($items);
        return new Response(json_encode($_items));

    }

    /**
     * @Route("/order/item")
     * @Method("DELETE")
     */
    public function deleteItemsAction()
    {
        $em = $this->getDoctrine()->getEntityManager();

        $_ids = json_decode($this->getRequest()->getContent(), true);
        $items = $em->getRepository('LTDeliveryBundle:Client\Order\Item')->getListByIds($_ids)
            ->getResult();

        foreach ($items as $item) {
            $em->remove($item);
        }

        $em->flush();

        return new Response(json_encode($this->serializeItems($items)));

    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm();
    }

    protected function serializeOrder($order)
    {
        $items = $order->getItems()->map(function ($item)
        {
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
            'menu_item'    => $item->getMenuItem()->getId(),
            'amount'       => $item->getAmount(),
            'order'        => $item->getOrder()->getId(),
        );
    }

    protected function serializeItems($items)
    {
        $_items = array();
        foreach ($items as $item) {
            $_items[] = $this->serializeItem($item);
        }

        return $_items;
    }

}
