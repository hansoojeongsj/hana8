package com.hana8.demo.entity;

import io.hypersistence.utils.hibernate.id.Tsid;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post extends BaseEntity {
	// @Id
	// @GeneratedValue(strategy = GenerationType.UUID)
	// // @UuidGenerator(style = UuidGenerator.Style.RANDOM)
	// @UuidGenerator
	// private String id;
	@Id
	@Tsid
	private String id;

	private String title; // 제목 수정해야 할 수도 있어야지 -> final 걸 수 없음

	public Post(String title) {
		this.title = title;
	}
}
