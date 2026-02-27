package com.hana8.demo.post;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PostEditDTO {
	@NotNull(groups = OnUpdate.class)
	private Long id;
	
	private String title;
	private String body;

	private String writer;

	public interface OnCreate {
	}

	public interface OnUpdate {
	}
}
