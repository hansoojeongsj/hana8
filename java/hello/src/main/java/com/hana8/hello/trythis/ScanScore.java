package com.hana8.hello.trythis;

public class ScanScore {
	public static void main(String[] args) {
		String[] names = {"Hong", "Kim", "Lee"};
		int[] scores = {70, 96, 92};

		int totScore = 0;
		double avgScore = 0;
		int bestScore = 0;
		String bestMember = "";
		for (int i = 0; i < 3; i++) {
			// scan...
			String name = names[i];
			int score = scores[i];
			totScore += score;
			if (score > bestScore) {
				bestScore = score;
				bestMember = name;
			}
		}
		System.out.println("--- 성적 결과 ---");
		System.out.println("총점: " + totScore);
		System.out.println("평균: " + (double)totScore / names.length);
		System.out.println("최고 득점자: " + bestMember + " (" + bestScore + "점)");
	}

}
