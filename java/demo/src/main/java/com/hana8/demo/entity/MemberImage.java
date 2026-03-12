package com.hana8.demo.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MemberImage extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "int unsigned") // 지금은 int로 충분, BigInt 회원수 거의 카카오
	private Integer id;

	@Column(nullable = false, length = 60)
	private String orgname;

	@Column(nullable = false, length = 50)
	private String savename; // 정해져 있음 uuid -> 20자? + a => 30자

	// 로컬에서 바뀔 수도 있으니 상대경로
	@Column(nullable = false, length = 10) // 업로드 폴더 아래 들어갈 것
	private String savedir;

	@Column(length = 2000)
	private String remark;

	@ManyToOne
	@JoinColumn(name = "member", referencedColumnName = "id",
		columnDefinition = "int unsigned not null",
		foreignKey = @ForeignKey(name = "fk_MemberImage_member"))
	@OnDelete(action = OnDeleteAction.CASCADE) // SET_NULL -> not null이면 안됨 (?)
	private Member member;

}
