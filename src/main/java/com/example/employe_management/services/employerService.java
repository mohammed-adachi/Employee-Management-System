package com.example.employe_management.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.employe_management.models.emolyer;
import com.example.employe_management.repostry.employeRepostry;

import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class employerService implements UserDetailsService {
 @Autowired
    private employeRepostry userrepositry;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      
        emolyer user = userrepositry.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new org.springframework.security.core.userdetails.User(
            user.getName(),
            user.getPassword(),  // Assurez-vous que c'est le mot de passe encodé
            new ArrayList<>()
        );  
      
    }
    public emolyer creatEmployer(emolyer user) {
        return userrepositry.save(user);
    }
    public List<emolyer> getEmployers() {
        return userrepositry.findAll();
    }
    public emolyer getEmployer(int id) {
        return userrepositry.findById(id).orElse(null);
    }
    public emolyer updateEmployer(emolyer user) {
        emolyer existingUser = userrepositry.findById(user.getId()).orElse(null);
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());
        existingUser.setPhone(user.getPhone());
        return userrepositry.save(existingUser);
    }   
    public void deleteEmployer(int id) {
        userrepositry.deleteById(id);
         
    }
}
