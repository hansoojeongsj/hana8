package com.hana8.hello.trythis;

import java.util.Comparator;
import java.util.List;
import java.util.OptionalDouble;
import java.util.Random;

public class StreamOptional {
	public static void main(String[] args) {
		List<Integer> list = List.of(1, 10, 6, 3, 3, 5, 4, 2, 7, 7, 9, 8, 10);

		System.out.println("짝수의 개수");
		long count = list.stream().filter(i -> i % 2 == 0).count();
		System.out.println(count);

		System.out.println("각 숫자를 제곱");
		list.stream().map(i -> i * i).forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("중복 제거");
		list.stream().distinct().forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("기본 정렬");
		list.stream().sorted().forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("역순(내림차순) 정렬");
		list.stream().sorted(Comparator.reverseOrder()).forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("처음 5개만 출력");
		list.stream().limit(5).forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("처음 5개 건너뛰고 출력");
		list.stream().skip(5).forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("값이 5보다 큰 것만 출력");
		list.stream().filter(i -> i > 5).forEach(i -> System.out.print(i + " "));
		System.out.println();

		System.out.println("1~10의 합계");
		int sum = list.stream().mapToInt(Integer::intValue).sum();
		System.out.println(sum);

		System.out.println("random 5개의 평균");
		OptionalDouble average = new Random().ints(5, 1, 11) // 1~10 사이 난수 5개
			.average(); // OptionalDouble

		System.out.println(average.orElse(0.0));
	}
}
