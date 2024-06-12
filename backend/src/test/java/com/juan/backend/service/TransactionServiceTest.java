package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Product;
import junit.framework.TestCase;
import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

public class TransactionServiceTest extends TestCase {

    private List<Object> response;

    private Long id = 1L; // Account 1

    @Mock
    private Session session;

    @Mock
    private Query query;

    @InjectMocks
    private TransactionService transactionService;

    @Before
    public void setUp() {
        session = HibernateUtil.getSessionFactory().openSession();
        query = null;
    }

    @Test
    public void testGetMyTransactions() {
        // Arrange
        query = session.createQuery("SELECT t FROM Transaction t");
        response = query.list();

        // Act
        response = (List<Object>) TransactionService.getMyTransactions(id);

        // Assert
        assertNotNull(response);
    }
}