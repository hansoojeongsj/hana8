package com.hana8.hello.trythis;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Emp {
	String name;
	String dept;
	int score;

	Emp(String name, String dept, int score) {
		this.name = name;
		this.dept = dept;
		this.score = score;
	}

	public String getName() {
		return name;
	}

	public String getDept() {
		return dept;
	}

	public int getScore() {
		return score;
	}

	@Override
	public String toString() {
		return name + "(" + score + ")";
	}

	public static void main(String[] args) {
		List<Emp> emps = Arrays.asList(
			new Emp("Hong", "Sales", 85),
			new Emp("Kim", "Sales", 95),
			new Emp("Choi", "HR", 55),
			new Emp("Nam", "HR", 75),
			new Emp("Lee", "IT", 82),
			new Emp("Park", "IT", 92),
			new Emp("Ahn", "Sales", 95)
		);

		// 고과 점수가 70점 미만인 사람은 제외
		System.out.println("고과 점수가 70점 미만인 사람은 제외");
		List<Emp> candidates = emps.stream()
			.filter(e -> e.getScore() >= 70)
			.toList();
		candidates.forEach(e -> System.out.println(e.getDept() + ": " + e.getName() + "(" + e.getScore() + ")"));

		// 남은 사람들은 부서별로 출력 (부서 이름 순)
		System.out.println("\n남은 사람들은 부서별로 출력 (부서 이름 순)");
		candidates.stream()
			.sorted(Comparator.comparing(Emp::getDept))
			.forEach(e -> System.out.println(e.getDept() + ": " + e.getName() + "(" + e.getScore() + ")"));

		// 부서 별 최고 점수 1명만 남기기
		// (점수가 같다면 이름이 빠른 사람 한명만 선택)
		System.out.println("\n부서 별 최고 점수 1명만 남기기");
		Map<String, Emp> topEmps = candidates.stream()
			.collect(Collectors.toMap(
				Emp::getDept,
				e -> e,
				(e1, e2) -> {
					if (e1.getScore() != e2.getScore())
						return e1.getScore() > e2.getScore() ? e1 : e2;
					return e1.getName().compareTo(e2.getName()) < 0 ? e1 : e2;
				}
			));
		topEmps.forEach((dept, e) -> System.out.println(dept + ": " + e.getName() + "(" + e.getScore() + ")"));

		// 부서 이름 역순으로 출력   출력 예) 부서명: 이름(점수)
		System.out.println("\n부서 이름 역순으로 출력   출력 예) 부서명: 이름(점수)");
		topEmps.entrySet().stream()
			.sorted(Map.Entry.comparingByKey(Comparator.reverseOrder()))
			.forEach(entry -> {
				Emp e = entry.getValue();
				System.out.println(e.getDept() + ": " + e.getName() + "(" + e.getScore() + ")");
			});
	}
}
