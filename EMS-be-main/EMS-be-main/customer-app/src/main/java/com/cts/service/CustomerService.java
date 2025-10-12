package com.cts.service;

import com.cts.entity.Customer;
import com.cts.exception.CustomerNotFoundException;
import com.cts.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + id));
    }

        public Customer createCustomer(Customer customer) {
            customer.setCustomerId(0); // ensure treated as new
            if (customer.getUser() != null) {
                customer.getUser().setCreatedAt(LocalDateTime.now());
            }
            return customerRepository.save(customer);
        }

        public Customer updateCustomer(int id, Customer updatedCustomer) {
        return customerRepository.findById(id).map(customer -> {
            customer.setAddress(updatedCustomer.getAddress());
            customer.setCity(updatedCustomer.getCity());
            customer.setState(updatedCustomer.getState());
            customer.setZipCode(updatedCustomer.getZipCode());
            customer.setCountry(updatedCustomer.getCountry());
            customer.setDob(updatedCustomer.getDob());
            customer.setAnniversary(updatedCustomer.getAnniversary());
            customer.setGender(updatedCustomer.getGender());
            customer.setUpdatedAt(java.time.LocalDateTime.now());
            customer.setUser(updatedCustomer.getUser());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + id));
    }

    public void deleteCustomer(int id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }
}
