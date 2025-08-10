package com.hexaware.automobile.insurancesystem.entities;
/*
 * Author : Praveen
 * Modified on : 25-Jul-2025
 * Description : Claim Entity class with ORM mapping
 */
import java.time.LocalDate; 

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "claims")
@Data
@NoArgsConstructor
public class Claim {
	@Id
    private int claimId;

    private LocalDate claimDate;
    private String claimReason;
    private String status;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    public Claim(int claimId, LocalDate claimDate, String claimReason, String status, Policy policy) {
        this.claimId = claimId;
        this.claimDate = claimDate;
        this.claimReason = claimReason;
        this.status = status;
        this.policy = policy;
    }
}
