package com.crmflame.api.dto;

public class RandomQuestionsRequest {
    private Integer quantity;
    
    public RandomQuestionsRequest() {}
    
    public RandomQuestionsRequest(Integer quantity) {
        this.quantity = quantity;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
