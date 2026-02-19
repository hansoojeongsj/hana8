package com.hana8.hello;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

class MyLambdaTest {
	private final List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

	@Test
	void test() {
		List<Integer> evens = MyLambda.filter(numbers, value -> value % 2 == 0);
		Assertions.assertThat(evens).isEqualTo(List.of(2, 4, 6, 8));
	}
}
