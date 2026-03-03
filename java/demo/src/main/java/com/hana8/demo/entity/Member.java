package com.hana8.demo.entity;

import org.hibernate.annotations.ColumnDefault;

import com.hana8.demo.common.enums.BloodType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity                        // 이게 있어야 DB 테이블로 인식
@Table(uniqueConstraints = {
	@UniqueConstraint(
		name = "uniq_User_email",
		columnNames = {"email"}
	)
})
public class Member extends BaseEntity { // BaseEntity를 상속받아 생성/수정시간 관리
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false, columnDefinition = "int unsigned") // unsigned int
	private Long id;

	// @Column(columnDefinition = "varchar(30) not null") 도 가능
	@Column(nullable = false, length = 30) // varchar(30)
	private String nickname;

	@Column(nullable = false, length = 255) // unique는 위에서
	private String email;

	private String passwd; // password는 예약어임 -> passwd

	@Enumerated(EnumType.STRING) // bloodType enum
	// @Column(nullable = false) // index로 잡을거면 nullable = false !!
	private BloodType bloodType;

	@ColumnDefault("false") // boolean default false // 안줘도 default가 false이긴 함
	private boolean isActive;
}
