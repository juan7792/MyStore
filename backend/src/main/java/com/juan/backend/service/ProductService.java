package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Account;
import com.juan.backend.entities.Product;
import com.juan.backend.entities.Transaction;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductService {

    public static List<Product> getAllProducts() {
        SessionFactory factory = null;
        Session session = null;
        List<Product> products = null;

        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();

            Query query = (Query) session.createQuery("select p from Product p");
            products = query.list();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return products;
        }
    }

    public static List<Product> getMyProducts() {
        SessionFactory factory = null;
        Session session = null;
        List<Product> products = null;

        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();

            Query query = (Query) session.createQuery("select p from Product p where p.account.accountId = 3");
            products = query.list();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return products;
        }
    }

    public static Product createProduct(Product product){
        SessionFactory factory = null;
        Session session = null;
        org.hibernate.Transaction tx = null;
        List<Account> account = null;

        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();
            tx = session.beginTransaction();

            Query query = (Query) session.createQuery("select a from Account a where a.accountId = 3");
            account = query.list();

            product.setAccount(account.get(0)); // Retrieve first Account object of the list
            product.setCreatedDate(new Date());
            product.setLastUpdatedDate(new Date());

            session.save(product);

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return product;
        }
    }

    public static Product sellProduct(Product product, int id) {
        SessionFactory factory = null;
        Session session = null;
        org.hibernate.Transaction tx = null;
        Transaction transaction = new Transaction();
        List<Product> products = null;

        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();
            tx = session.beginTransaction();

            // Manage product
            if (!product.isSold()){
                Query query = (Query) session.createQuery(
                        "select p from Product p where p.productId = " + id);
                products = query.list();
                products.get(0).setSold(true);
            }

            // Create transaction
            transaction.setProduct(product);
            transaction.setCreatedDate(new Date());

            session.save(transaction);

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return product;
        }
    }

    public static Product deleteMyProduct(int id) {
        SessionFactory factory = null;
        Session session = null;
        org.hibernate.Transaction tx = null;
        List<Product> products = null;


        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();
            tx = session.beginTransaction();

            // Manage product
            Query query = (Query) session.createQuery("select p from Product p where p.productId = " + id);
            products = query.list();

            session.delete(products.get(0));

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return null;
        }
    }
}