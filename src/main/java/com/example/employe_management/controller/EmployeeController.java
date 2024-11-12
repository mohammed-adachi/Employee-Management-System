package com.example.employe_management.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.employe_management.models.emolyer;
import com.example.employe_management.models.registerDLO;
import com.example.employe_management.repostry.employeRepostry;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
     @Value("${security.jwt.secret-key}")
  private String secretKey;
  @Value("${security.jwt.issuer}")
    private String issuer;
 @Autowired
  private employeRepostry userrepositry;



  @PostMapping("/register")
  public ResponseEntity<Object> register(@ Valid @RequestBody registerDLO registerDLO ,BindingResult result){
    
    
    if(result.hasErrors()){
      var  errorlist= result.getAllErrors();
      var errorMap= new HashMap<String,String>();
      for(var error:errorlist){
        errorMap.put(error.getObjectName(),error.getDefaultMessage());
      }
      return ResponseEntity.badRequest().body(errorMap);
    }
    
   var bCryptPassword= new BCryptPasswordEncoder();
    var user= new emolyer();

    user.setName(registerDLO.getName());
    user.setPassword(bCryptPassword.encode(registerDLO.getPassword()));
    user.setEmail(registerDLO.getEmail());
    user.setAddress(registerDLO.getAddress());
    user.setPhone(registerDLO.getPhone());
    
   
    try {
      var otheruser= userrepositry.findByName(registerDLO.getName());
      if(otheruser != null){
        return ResponseEntity.badRequest().body("user already exist");
      }

      var otheruseremail= userrepositry.findByEmail(registerDLO.getEmail());
      if(otheruseremail != null){
        return ResponseEntity.badRequest().body("email already exist");
      }
      userrepositry.save(user);
      
      var response= new HashMap<String,Object>();
      response.put("user",user);
      response.put("token",createJwtToken(user));
      return ResponseEntity.ok(response);

    } catch (Exception e) {
      System.out.println("is ana exception");
      e.printStackTrace();
    }
    return ResponseEntity.badRequest().body("error");
  }
  @PutMapping("/update/{id}")
  public ResponseEntity<Object> updateEmployee(
      @PathVariable Long id,
      @Valid @RequestBody registerDLO updateDLO,
      BindingResult result) {
  
    if (result.hasErrors()) {
      var errorList = result.getAllErrors();
      var errorMap = new HashMap<String, String>();
      for (var error : errorList) {
        errorMap.put(error.getObjectName(), error.getDefaultMessage());
      }
      return ResponseEntity.badRequest().body(errorMap);
    }
  
    Optional<emolyer> existingUserOptional = userrepositry.findById(id);
    if (!existingUserOptional.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
  
    emolyer existingUser = existingUserOptional.get();
  
    // Check for email conflicts: Ensure the email is not already used by another user
    emolyer otherUserWithEmail = userrepositry.findByEmail(updateDLO.getEmail());
    if (otherUserWithEmail != null && otherUserWithEmail.getId()!=id) {
      return ResponseEntity.badRequest().body("Email already in use by another user");
    }
  
    // Check for name conflicts: Ensure the name is not already used by another user
    emolyer otherUserWithName = userrepositry.findByName(updateDLO.getName());
    if (otherUserWithName != null && otherUserWithName.getId()!=id){
      return ResponseEntity.badRequest().body("Username already in use by another user");
    }
  
    // Update user fields
    existingUser.setName(updateDLO.getName());
    existingUser.setEmail(updateDLO.getEmail());
    existingUser.setAddress(updateDLO.getAddress());
    existingUser.setPhone(updateDLO.getPhone());
  
    userrepositry.save(existingUser);
  
    var response = new HashMap<String, Object>();
    response.put("user", existingUser);
    response.put("token", createJwtToken(existingUser));
  
    return ResponseEntity.ok(response);
  }
  @DeleteMapping("/delete/{id}")
public ResponseEntity<Object> deleteEmployee(@PathVariable Long id) {
    Optional<emolyer> existingUserOptional = userrepositry.findById(id);
    if (!existingUserOptional.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    emolyer existingUser = existingUserOptional.get();
    
    // Supprimer l'utilisateur de la base de données
    userrepositry.delete(existingUser);

    // Retourner une réponse de succès
    return ResponseEntity.ok("User deleted successfully");
}
@GetMapping("/get/{id}")
public ResponseEntity<Object> getEmployee(@PathVariable Long id) {
    Optional<emolyer> existingUserOptional = userrepositry.findById(id);
    if (!existingUserOptional.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    emolyer existingUser = existingUserOptional.get();
    
    // Retourner les détails de l'utilisateur
    return ResponseEntity.ok(existingUser);
}


    private String createJwtToken(emolyer user){
    Instant now = Instant.now();
    JwtClaimsSet claims = JwtClaimsSet.builder()
    .subject(user.getName())
    .issuer(issuer)
    .issuedAt(now)
    .claim("name", user.getName())
    .subject(user.getName())
    .expiresAt(now.plusSeconds(60))    
    .build();
    var encoder= new NimbusJwtEncoder(new ImmutableSecret<>(secretKey.getBytes()));
    var parms= JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(),claims);
     return encoder.encode(parms).getTokenValue();  
    }


}
