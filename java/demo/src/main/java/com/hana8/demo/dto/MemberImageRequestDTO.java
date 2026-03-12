package com.hana8.demo.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class MemberImageRequestDTO {
	Long memberId;

	@NotEmpty
	List<MultipartFile> files;

	@NotEmpty // service에서 null 체크 안 하고 validation 하겠다 (?)
	List<String> remarks; // 아무것도 안 넣는다? 하나도 안 넣는다도 가능

}
