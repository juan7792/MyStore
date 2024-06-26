package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.common.BadInputException;
import com.juan.backend.common.MaxProductsException;
import com.juan.backend.common.MaxTransactionsException;
import com.juan.backend.common.ProductNotFoundException;
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

    private static SessionFactory factory;

    private static Session session;


    public static List<Product> getAllProducts() {
        List<Product> products = null;

        try {
            Session currentSession = getSession();

            Query query = (Query) currentSession.createQuery("SELECT p FROM Product p");
            products = query.list();

            setSession(currentSession);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return products;
        }
    }

    public static List<Product> getMyProducts(Long id) {
        List<Product> products = null;

        try {
            Session currentSession = getSession();

            Query query = (Query) currentSession.createQuery("SELECT p FROM Product p WHERE p.account.accountId = :id");
            query.setParameter("id", id);
            products = query.list();

            setSession(currentSession);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return products;
        }
    }

    public static Product createProduct(Product product, Long id){
        org.hibernate.Transaction tx = null;
        List<Account> account = null;

        try {
            Session currentSession = getSession();
            tx = currentSession.beginTransaction();

            // Throw error if incorrect data is sent
            if (product == null)
                throw new BadInputException();

            // Throw error if maximum number of products in the app is reached
            if (isNumberOfProductsExceeded(currentSession))
                throw new MaxProductsException();

            Query query = (Query) currentSession.createQuery("SELECT a FROM Account a WHERE a.accountId = :id");
            query.setParameter("id", id);
            account = query.list();

            product.setAccount(account.get(0)); // Retrieve first Account object of the list
            product.setCreatedDate(new Date());
            product.setLastUpdatedDate(new Date());

            currentSession.save(product);
            setSession(currentSession);

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return product;
        }
    }

    public static Product sellProduct(Product product, Long id) {
        org.hibernate.Transaction tx = null;
        Transaction transaction = new Transaction();
        List<Product> products = null;

        try {
            Session currentSession = getSession();
            tx = currentSession.beginTransaction();

            // Throw error if product is not found in the database
            if (product == null)
                throw new ProductNotFoundException();

            // Throw error if maximum number of transactions in the app is reached
            if (isNumberOfTransactionsExceeded(currentSession))
                throw new MaxTransactionsException();

            // Manage product
            if (!product.isSold()){
                Query query = (Query) currentSession.createQuery(
                        "SELECT p FROM Product p WHERE p.productId = :id");
                query.setParameter("id", id);
                products = query.list();
                products.get(0).setSold(true);
                product = products.get(0);
            }

            // Create transaction
            transaction.setProduct(product);
            transaction.setCreatedDate(new Date());

            currentSession.save(transaction);
            setSession(currentSession);

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return product;
        }
    }

    public static Product deleteMyProduct(Long id) {
        org.hibernate.Transaction tx = null;
        List<Product> products = null;

        try {
            Session currentSession = getSession();
            tx = currentSession.beginTransaction();

            // Manage product
            Query query = (Query) currentSession.createQuery("SELECT p FROM Product p WHERE p.productId = :id");
            query.setParameter("id", id);
            products = query.list();

            // Throw error
            if (products == null)
                throw new ProductNotFoundException();

            currentSession.delete(products.get(0));
            setSession(currentSession);

            tx.commit();

        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            return null;
        }
    }

    public static boolean isNumberOfProductsExceeded(Session session) {
        Query query = (Query) session.createQuery("SELECT p FROM Product p");
        List<Product> products = query.list();

        return products.toArray().length > 20;
    }

    public static boolean isNumberOfTransactionsExceeded(Session session) {
        Query query = (Query) session.createQuery("SELECT t FROM Transaction t");
        List<Transaction> transactions = query.list();

        return transactions.toArray().length > 50;
    }

    public static Session getSession() {
        if (session != null && session.isConnected())
            session.close();
        // Reset session
        factory = null;
        session = null;

        // Set session
        factory = HibernateUtil.getSessionFactory();
        session = HibernateUtil.getSessionFactory().openSession();
        return session;
    }

    public static void setSession(Session session) {
        if (ProductService.session == session)
            return;
        ProductService.session = session;
    }
}
