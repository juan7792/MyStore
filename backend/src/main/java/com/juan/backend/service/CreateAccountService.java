package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Account;
import com.juan.backend.entities.Product;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CreateAccountService {
    public static Product createAccount(Product product){
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
}
