package prac.variable;

public class Var3 {
	public static void main(String[] args) {
		// 변수는 꼭 초기화 해야 함
		// 지역변수 -> 개발자 직접 초기화
		// 컴파일 에러, javac로 .class 파일 만드는 컴파일 해야하는데
		// 이게(초기화가) 안되고 있음.
		// 좋은 에러, 컴파일 에러 /  나쁜 에러, 런타임 에러
		// 계좌이체 해서 내 돈은 나갔는데, 상대한테 돈 안 들어감
		// 내 돈 어디감. 개발자 버그 -> 아주아주아주 큰일난거임
		// 컴파일 에러 많이 나게 장치하는 것 중요
		int a;
		int b;
		int c, d;

		// 컴파일할때 다 ~ 컴파일해서 얘 주석 해줘야 함.
		// 다른거 실행할때 안 그러면 컴파일 에러 남
		// System.out.println(a);
	}
}
