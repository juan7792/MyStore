package com.juan.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "CURRENCY")
public class ObsoleteCurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CURRENCY_ID")
    private int currencyId;
    @Column(name = "PRODUCT_FK_CUR")
    private int productId;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "VALUE")
    private int value;

    public int getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(int currencyId) {
        this.currencyId = currencyId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
