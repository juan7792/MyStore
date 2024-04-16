package com.juan.backend.controller;

import com.juan.backend.entities.Product;
import com.juan.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/allproducts")
    public List<Product> getAllProducts() {
        return ProductService.getAllProducts();
    }

    @GetMapping("/myproducts")
    public List<Product> getMyProducts() {
        return ProductService.getMyProducts();
    }

    @PostMapping(value = { "/allproducts", "/myproducts" })
    @ResponseStatus(HttpStatus.CREATED)
    public Product addProduct(@RequestBody Product product) {
        return ProductService.createProduct(product);
    }

    @PutMapping("/allproducts/{id}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("id") int id) {
        return ProductService.sellProduct(product, id);
    }

    @DeleteMapping("/myproducts/{id}")
    public Product deleteProduct(@PathVariable("id") int id){
        return ProductService.deleteMyProduct(id);
    }
}
