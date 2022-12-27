package com.example.ajax.service;

import com.example.ajax.model.Customer;
import com.example.ajax.repository.ICustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    public List<Customer> findAll() {
        return iCustomerRepository.findAll();
    }

    public Customer save(Customer customer) {
        return iCustomerRepository.save(customer);
    }

    public void delete(Long id) {
        iCustomerRepository.deleteById(id);
    }

    public Customer findById(Long id) {
        return iCustomerRepository.findById(id).get();
    }
}
