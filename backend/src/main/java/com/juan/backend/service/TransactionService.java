package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    public static Object getMyTransactions() {
        SessionFactory factory = null;
        Session session = null;
        List<Object> response = null;

        try {
            factory = HibernateUtil.getSessionFactory();
            session = factory.openSession();

            Query query = (Query) session.createQuery(
                    "select p.description, t.createdDate " +
                            "from Transaction t " +
                            "inner join Product p " +
                            "on t.product.productId = p.productId " +
                            "where p.account.accountId = 3");
            response = query.list();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return response;
        }
    }
}
