package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Product;
import junit.framework.TestCase;
import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest extends TestCase {

    @Mock
    private Session session;

    @Mock
    private Query query;

    @InjectMocks
    private ProductService productService;

    @Test
    public void testGetAllProducts() {
        // Arrange
        session = HibernateUtil.getSessionFactory().openSession();
        query = session.createQuery("select p from Product p");

        // Act
        List<Product> products = query.list();

        // Assert
        assertNotNull(products);
    }
}