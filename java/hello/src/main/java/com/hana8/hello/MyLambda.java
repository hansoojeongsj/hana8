package com.hana8.hello;

import java.util.ArrayList;
import java.util.List;

@FunctionalInterface
interface MyPredicate<T> {
	boolean test(T t);
}

@FunctionalInterface
interface MyFunction<T, R> {
	R apply(T t);
}

@FunctionalInterface
interface MyReducer<T, R> {
	R reduce(R acc, T t);
}

public class MyLambda {

	public static void main(String[] args) {
		List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

		List<Integer> evens = filter(numbers, value -> value % 2 == 0);
		List<Integer> squares = map(numbers, value -> value * value);
		Integer bigger3 = find(numbers, value -> value > 3);

		int sum1 = reducer(numbers, 100, Integer::sum);
		int sum2 = reducer(numbers, 0, (a, b) -> a * b);
		int sum3 = reducer(numbers, 10, (a, b) -> a * b);

		System.out.println(evens);
		System.out.println(squares);
		System.out.println(bigger3);
		System.out.println(sum1);
		System.out.println(sum2);
		System.out.println(sum3);
	}

	static List<Integer> filter(List<Integer> list, MyPredicate<Integer> predicate) {
		List<Integer> result = new ArrayList<>();
		for (Integer value : list) {
			if (predicate.test(value))
				result.add(value);
		}
		return result;
	}

	static List<Integer> map(List<Integer> list, MyFunction<Integer, Integer> function) {
		List<Integer> result = new ArrayList<>();
		for (Integer value : list) {
			result.add(function.apply(value));
		}
		return result;
	}

	static Integer find(List<Integer> list, MyPredicate<Integer> predicate) {
		for (Integer value : list) {
			if (predicate.test(value)) {
				return value;
			}
		}
		return null;
	}

	static Integer reducer(List<Integer> list, int initValue, MyReducer<Integer, Integer> reducer) {
		int result = initValue;
		for (Integer value : list) {
			result = reducer.reduce(result, value);
		}
		return result;
	}
}
