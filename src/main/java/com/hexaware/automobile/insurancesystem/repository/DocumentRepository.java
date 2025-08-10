package com.hexaware.automobile.insurancesystem.repository;
/* Author : Praveen   
 * Modified on : 31-Jul-2025
 * Description : Document Repository interface
 * */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.automobile.insurancesystem.entities.Document;
@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
