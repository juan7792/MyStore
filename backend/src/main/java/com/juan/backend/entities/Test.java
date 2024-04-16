package com.juan.backend.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TEST")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TEST_ID")
    private int testId;
    @Column(name = "TEST", nullable = false, updatable = false)
    private String test;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TEST_DATE")
    private Date testDate;

    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public Date getTestDate() {
        return testDate;
    }

    public void setTestDate(Date testDate) {
        this.testDate = testDate;
    }
}
