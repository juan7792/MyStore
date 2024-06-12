package com.juan.backend.service;

import com.juan.backend.HibernateUtil;
import com.juan.backend.entities.Product;
import junit.framework.TestCase;
import org.hibernate.Query;
import org.hibernate.Session;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.annotation.Order;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest extends TestCase {

    private List<Product> products;

    private Product sampleProduct = new Product();

    private Long id = 1L; // Account 1

    @Mock
    private Session session;

    @Mock
    private Query query;

    @InjectMocks
    private ProductService productService;

    @Before
    public void setUp() {
        session = HibernateUtil.getSessionFactory().openSession();
        products = null;
        query = null;
    }

    @Test
    public void testGetAllProducts() {
        // Arrange
        query = session.createQuery("SELECT p FROM Product p");
        products = query.list();

        // Act
        products = ProductService.getAllProducts();

        // Assert
        assertNotNull(products);
        assertThat(products, everyItem(instanceOf(Product.class)));
    }

    @Test
    public void testGetMyProducts() {
        // Arrange
        query = session.createQuery("SELECT p FROM Product p WHERE p.account.accountId = 1");
        products = query.list();

        // Act
        products = ProductService.getMyProducts(id);

        // Assert
        assertNotNull(products);
        assertThat(products, everyItem(instanceOf(Product.class)));
    }

    @Test
    public void testZDeleteMyProduct() {
        // Arrange
        query = session.createQuery("SELECT p FROM Product p ORDER BY createdDate DESC");
        products = query.list();
        sampleProduct = products.get(0); // Get latest element created by the test

        // Act
        Product deletedProduct = ProductService.deleteMyProduct(sampleProduct.getProductId());

        // Assert
        assertNull(deletedProduct);
    }

    @Test
    public void testSellProduct() {
        // Arrange
        query = session.createQuery("SELECT p FROM Product p ORDER BY createdDate DESC");
        products = query.list();
        sampleProduct = products.get(0); // Get latest element created by the test
        System.out.println(sampleProduct.isSold());

        // Act
        Product modifiedProduct = ProductService.sellProduct(sampleProduct, sampleProduct.getProductId());

        // Assert
        assertNotNull(modifiedProduct);
        assertEquals(modifiedProduct.isSold(), true);
    }

    @Test
    public void testCreateProduct() {
        // Arrange
        sampleProduct.setName("Test name");
        sampleProduct.setDescription("Test description");
        sampleProduct.setPrice(Long.valueOf(123));
        sampleProduct.setCurrency("VEF");
        sampleProduct.setSold(false);
        sampleProduct.setCreatedDate(new Date());
        sampleProduct.setLastUpdatedDate(new Date());

        // Act
        Product createdProduct = ProductService.createProduct(sampleProduct, id);

        // Assert
        assertNotNull(createdProduct);
        assertThat(createdProduct, instanceOf(Product.class));
    }

}