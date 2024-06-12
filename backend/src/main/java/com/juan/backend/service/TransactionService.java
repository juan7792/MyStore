package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Product;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private static SessionFactory factory;
    private static Session session;

    public static Object getMyTransactions(Long id) {
        List<Object> response = null;

        try {
            Session currentSession = getSession();

            Query query = (Query) currentSession.createQuery(
                    "SELECT p.name, p.price, p.currency, t.createdDate " +
                            "FROM Transaction t " +
                            "INNER JOIN Product p " +
                            "ON t.product.productId = p.productId " +
                            "WHERE p.account.accountId = :id");
            query.setParameter("id", id);
            response = query.list();

            setSession(currentSession);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return response;
        }
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
        if (TransactionService.session == session)
            return;
        TransactionService.session = session;
    }
}
