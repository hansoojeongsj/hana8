package com.hana8.demo;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.hana8.demo.entity.Post;
import com.hana8.demo.repository.PostRepository;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitLoader implements ApplicationRunner {
	private final PostRepository postRepository;

	@Override
	public void run(@Nullable ApplicationArguments args) throws Exception {
		postRepository.save(new Post("Title1"));
		postRepository.save(new Post("Title2"));
		postRepository.save(new Post("Title3"));

	}
	// 메소드 오버라이드-> 같은 이름 여러개 가능, 리턴 타입 가지고는 안돼.
	// run(내부가 달라야) throws의 여부는 관계 없음
}
