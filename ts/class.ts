// 클래스 기본 구조

// class는 타입 + 생성자 + 기능(메서드)을 한 덩어리로 묶는 문법이다
// interface와 다르게 "실제 구현된 코드"가 존재한다.

class Assignment {
  // 필드(property)
  // 타입스크립트 클래스에서는 "속성의 타입"을 명시할 수 있다
  grade: number | string;

  // 생성자(constructor)
  // new로 객체가 생성될 때 자동으로 실행되는 함수
  constructor(grade: number | string) {
    // this = 생성된 객체 자신
    this.grade = grade;
  }
}

// 상속 (extends)

class GradeAssignment extends Assignment {
  // 부모 클래스의 속성과 메서드를 그대로 상속받는다
  // grade를 다시 선언하지 않아도 부모의 grade가 이미 존재한다
  // (지금은 예제를 위해 남겨둠)
  grade: number | string;
  // 리스코프치환의 원칙 위배
  //grade: number | string | boolean;

  constructor(grade: number) {
    // super()
    // 부모 클래스의 constructor를 호출
    // 반드시 this 사용 전에 호출해야 한다
    super(grade);

    // 부모의 grade를 다시 덮어쓴 것
    this.grade = grade;

    console.log('grade>>', this.grade);
  }

  // 메서드

  // 부모에는 없는 "자식만의 기능"
  // 이게 바로 확장성
  calc() {
    // 런타임 타입 체크
    // 타입스크립트는 컴파일 타임 언어이기 때문에
    // 실제 실행 중인 값의 타입은 직접 검사해야 한다
    if (typeof this.grade !== 'number') {
      throw new Error('숫자 점수만 calc() 가능');
    }

    return this.grade + 100;
  }
}

// 다형성 (Polymorphism)

// 타입은 부모
// 실제 객체는 자식
// 이것이 다형성이다

const x: Assignment = new GradeAssignment(100);

// 부모 타입으로 접근할 땐
// 부모가 가진 속성만 접근 가능
x.grade = 30;

// instanceof 타입 가드

// x는 Assignment 타입이므로
// TS는 calc()가 있는지 모른다

// 그래서 자식인지 검사하고 나서 사용
if (x instanceof GradeAssignment) {
  console.log('calc>>', x.calc());
}
