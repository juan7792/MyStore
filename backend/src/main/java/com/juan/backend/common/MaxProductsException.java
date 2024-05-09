package com.juan.backend.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The maximum number of all products in this app is 20. " +
        "Please delete products in \"My Products\" if you want to create more items.")
public class MaxProductsException extends RuntimeException {
}
