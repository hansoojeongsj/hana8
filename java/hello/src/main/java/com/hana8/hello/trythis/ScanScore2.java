package com.hana8.hello.trythis;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class ScanScore2 {
	static void main() {
		int totScore = 0;
		int bestScore = 0;
		String bestMember = "";

		Scanner scanner = new Scanner(System.in);

		int index;
		for (index = 0; index < 3; index++) {
			System.out.print("이름과 점수는? ");
			try {
				String name = scanner.next();
				int score = scanner.nextInt();

				totScore += score;
				if (score > bestScore) {
					bestScore = score;
					bestMember = name;
				}
			} catch (Exception e) {
				System.out.println("입력형식이 잘못되었습니다! usage) 홍길동 80");
				index--;
				scanner.nextLine();
				// continue;
			}
		}

		scanner.close();

		// double avgScore = (double)totScore / index;
		BigDecimal bdTotScore = new BigDecimal(totScore);
		BigDecimal bdCnt = BigDecimal.valueOf(index);
		double avgScore = bdTotScore.divide(bdCnt, 2, RoundingMode.HALF_UP).doubleValue();
		System.out.printf("총점은 %d점, 평균은 %.2f점, 최고 득점자는 %s이며 학점은 %c 입니다.", totScore, avgScore, bestMember,
			grading(bestScore));
	}

	// 학점은 90점 이상은 A, 80 ~ 89점음 B, 70 ~ 79는 C, 그 외 D 학점
	private static char grading(int score) {
		// if (score >= 90) return 'A';
		// else if (score >)
		return switch (score / 10) {
			case 9 -> 'A';
			case 8 -> 'B';
			case 7 -> 'C';
			default -> 'D';
		};
	}
}
