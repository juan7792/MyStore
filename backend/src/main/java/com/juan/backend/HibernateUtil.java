package com.juan.backend;

import com.juan.backend.entities.Product;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.context.annotation.Bean;

import java.util.List;

public class HibernateUtil {
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {

        try {
            StandardServiceRegistry standardRegistry = new StandardServiceRegistryBuilder() .configure("hibernate.cfg.xml").build();
            Metadata metadata = new MetadataSources(standardRegistry).getMetadataBuilder().build();
            return metadata.getSessionFactoryBuilder().build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new RuntimeException("There was an error building the factory");

    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}