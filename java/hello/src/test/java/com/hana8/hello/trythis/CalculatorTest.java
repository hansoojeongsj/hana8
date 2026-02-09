package com.hana8.hello.trythis;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;

class CalculatorTest {

	@Test
	void continuousCalculation() {
		// 실행 예시 1. 71 + 90 = 161 -> 161 - 61 = 100
		BigDecimal v1 = new BigDecimal("71");
		BigDecimal v2 = new BigDecimal("90");
		BigDecimal res1 = Calculator.Operator.findBySymbol("+").calculate(v1, v2);
		assertEquals(0, res1.compareTo(new BigDecimal("161")));

		BigDecimal v3 = new BigDecimal("61");
		BigDecimal res2 = Calculator.Operator.findBySymbol("-").calculate(res1, v3);
		assertEquals(0, res2.compareTo(new BigDecimal("100")));
	}

	@Test
	void decimalAndInputError() {
		// 실행 예시 2. 소수점 연산 및 입력 오류 검증
		BigDecimal d1 = new BigDecimal("0.1");
		BigDecimal d2 = new BigDecimal("0.2");
		BigDecimal res = Calculator.Operator.findBySymbol("+").calculate(d1, d2);
		assertEquals(0, res.compareTo(new BigDecimal("0.3")));

		// 잘못된 연산자 기호 (&)
		assertThrows(IllegalArgumentException.class, () -> {
			Calculator.Operator.findBySymbol("&");
		});

		// 숫자 아닌 입력 (a2)
		assertThrows(NumberFormatException.class, () -> {
			new BigDecimal("a2");
		});
	}

	@Test
	void exceptionHandlingAndKeepValue() {
		// 실행 예시 3. 71 / 0 예외 발생 후에도 기존 값 71 유지하여 연산
		BigDecimal currentVal = new BigDecimal("71");

		// 71 / 0 -> 예외
		assertThrows(ArithmeticException.class, () -> {
			Calculator.Operator.findBySymbol("/").calculate(currentVal, BigDecimal.ZERO);
		});

		// 예외 후에도 currentVal(71) 그대로 써서 - 61 수행
		BigDecimal v2 = new BigDecimal("61");
		BigDecimal finalRes = Calculator.Operator.findBySymbol("-").calculate(currentVal, v2);

		// 최종 결과 10
		assertEquals(0, finalRes.compareTo(new BigDecimal("10")));
	}
}
