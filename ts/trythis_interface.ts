interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

// type Ud2 = (User | Dept) & { addr: string };

// 다중상속이 되면 좋은데, 사실 다중상속이 되지 않는 문제임
// 다중상속은 합쳐지는 거 !
// 아래 interface 작동 잘 되는 것처럼 보이지만 아님!

// 시도
// type UdT = (User | Dept) & { addr: string };
// type UdT = User & Dept;
// type xx = { [k in keyof UdT]: string | number };

// 최대한의 방법
interface Ud2 {
  id: number;
  name?: string;
  dname?: string;
  captain?: string;
  // [x: string]: number | string;
  addr: string;
}

// .... 최대한의 방법2???
// interface Ud2 {
//   id: number;
//   [x: string]: number | string;
//   addr: string;
// }

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: 'HH', addr: 'Seoul' };
// 오류내기
// const ud2: Ud2 = { id: 1, name: 'HH', addr: 'Seoul', xx: 1 };
const ud3 = { id: 1, dname: 'HH', captain: 'HH', addr: 'Seoul' };

console.log('ud2:', ud2, '\nud3:', ud3);
