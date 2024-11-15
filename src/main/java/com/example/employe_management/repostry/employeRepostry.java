package com.example.employe_management.repostry;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.employe_management.models.emolyer;

public interface employeRepostry extends JpaRepository<emolyer,Long> {
public emolyer findByName(String name) ;
public emolyer findByEmail(String email); 
	// implementation goes here


}
