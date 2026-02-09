package com.hana8.hello.trythis;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Calculator {

	// 연산 정의, 로직
	public enum Operator {
		PLUS("+") {
			@Override
			public BigDecimal calculate(BigDecimal a, BigDecimal b) {
				return a.add(b);
			}
		},
		MINUS("-") {
			@Override
			public BigDecimal calculate(BigDecimal a, BigDecimal b) {
				return a.subtract(b);
			}
		},
		MULTIPLY("*") {
			@Override
			public BigDecimal calculate(BigDecimal a, BigDecimal b) {
				return a.multiply(b);
			}
		},
		DIVIDE("/") {
			@Override
			public BigDecimal calculate(BigDecimal a, BigDecimal b) {
				if (b.compareTo(BigDecimal.ZERO) == 0)
					throw new ArithmeticException("/ by zero");
				return a.divide(b, 10, RoundingMode.HALF_UP).stripTrailingZeros();
			}
		};

		private final String symbol;

		Operator(String symbol) {
			this.symbol = symbol;
		}

		// 추상 메서드
		public abstract BigDecimal calculate(BigDecimal a, BigDecimal b);

		public static Operator findBySymbol(String symbol) {
			for (Operator op : values()) {
				if (op.symbol.equals(symbol))
					return op;
			}
			throw new IllegalArgumentException("그런 연산자는 없습니다!");
		}
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		BigDecimal currentVal = null;

		while (true) {
			try {
				// 값1, 최초 실행, 결과값 유지
				if (currentVal == null) {
					currentVal = readNumber(sc, "값1? ", null);
				}

				// 연산자
				System.out.print("연산자(+, -, *, /)? ");
				String opSym = sc.nextLine().trim();
				if (".".equals(opSym))
					break;
				Operator op = Operator.findBySymbol(opSym);

				// 값2, 비어있으면 앞 숫자 사용
				BigDecimal val2 = readNumber(sc, "값2? ", currentVal);

				// 연산 수행 및 결과 출력, 전략 패턴
				currentVal = op.calculate(currentVal, val2);
				System.out.println(" ⇒ " + currentVal.toPlainString());
				System.out.println();

				// '값1?' 다시
				currentVal = readNumber(sc, "값1? ", currentVal);

			} catch (ArithmeticException e) {
				System.out.println("잘못된 연산(" + e.getMessage() + ")");
				System.out.println();
			} catch (IllegalArgumentException e) {
				System.out.println(e.getMessage());
				System.out.println();
			}
		}
		sc.close();
	}

	private static BigDecimal readNumber(Scanner sc, String message, BigDecimal defaultValue) {
		while (true) {
			System.out.print(message);
			String input = sc.nextLine().trim();

			if (".".equals(input))
				System.exit(0);
			if (input.isEmpty() && defaultValue != null)
				return defaultValue;
			if (input.isEmpty())
				continue;

			try {
				return new BigDecimal(input);
			} catch (NumberFormatException e) {
				System.out.println("숫자만 입력 가능합니다!");
			}
		}
	}
}
