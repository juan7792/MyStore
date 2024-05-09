package com.juan.backend.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The maximum number of all transactions in this app is 50. " +
        "Please delete products in \"My Products\" if you want to purchase more products.")
public class MaxTransactionsException extends RuntimeException{
}
