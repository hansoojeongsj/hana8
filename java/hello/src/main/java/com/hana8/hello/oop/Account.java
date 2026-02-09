package com.hana8.hello.oop;

// 입금은 공통
// 멤버 변수 (계좌명/잔액) 공통
// -> 부모 클래스가 있고 자식 클래스들 있으면 될듯
public class Account {
	private final String name;
	protected double amount;

	public Account(String name) {
		this.name = name;
	}

	public void deposit(double amount) {
		this.amount += amount;
	}

	protected void close() {
		System.out.println(this.name + " 통장을 해지하였습니다!");
	}

	@Override
	public String toString() {
		return "Account{" +
			"name='" + name + '\'' +
			", amount=" + amount +
			'}';
	}
}
