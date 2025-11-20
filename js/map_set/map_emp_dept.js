const assert = require("assert");

const hrTeam = { id: 1, dname: "인사팀" };
const devTeam = { id: 2, dname: "개발팀" };
const depts = [hrTeam, devTeam];

const hong = { id: 1, name: "Hong", dept: 1 }; // hong.dept.dname ⇒ deptMap.get(hong.dept)?.dname
const kim = { id: 2, name: "Kim", dept: 2 };
const emps = [
  hong,
  kim,
  { id: 3, name: "Park", dept: 2 },
  { id: 4, name: "Choi", dept: 2 },
];

const x = depts.map((dept) => [dept.id, dept]);
console.log("🚀 ~ x:", x);
const deptMap = new Map(x);
console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)
assert.deepStrictEqual([...deptMap.values()], depts);

const empMap = new Map(emps.map((emp) => [emp.id, emp]));
console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }
assert.deepStrictEqual(
  [...empMap.keys()],
  emps.map((emp) => emp.id)
);
assert.deepStrictEqual([...empMap.values()], emps);

const empDept = new Map(
  emps.map((emp) => {
    const value = deptMap.get(emp.dept);
    delete emp.dept;
    return [emp, value];
  })
);
console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }

assert.strictEqual(empDept.get(kim).dname, devTeam.dname);
assert.deepStrictEqual(
  [...empDept.keys()],
  emps.map(({ id, name }) => ({ id, name }))
);
assert.deepStrictEqual(new Set([...empDept.values()]), new Set(depts));

function getEmp(empId) {
  const emp = empMap.get(empId);
  emp.dept = empDept.get(emp);

  return emp;
}
assert.deepStrictEqual(getEmp(1), {
  id: 1,
  name: "Hong",
  dept: { id: 1, dname: "인사팀" },
});
console.log("--------------------- groupBy");

const assert = require("assert");

const hongx = { id: 1, name: "Hong", dept: "HR" };
const kimx = { id: 2, name: "Kim", dept: "Server" };
const lee = { id: 3, name: "Lee", dept: "Front" };
const park = { id: 4, name: "Park", dept: "HR" };
const ko = { id: 7, name: "Ko", dept: "Server" };
const loon = { id: 6, name: "Loon", dept: "Sales" };
const choi = { id: 5, name: "Choi", dept: "Front" };
const users = [hongx, kimx, lee, park, ko, loon, choi];

Array.prototype.uniqBy = function (prop) {
  return [...new Set(this.map((a) => a[prop]))];
};

assert.deepStrictEqual(users.uniqBy("dept"), [
  "HR",
  "Server",
  "Front",
  "Sales",
]);

Array.prototype.groupByMap = function (prop) {
  const map = new Map();
  for (const a of this) {
    const key = a[prop]; // 'HR'
    const val = map.get(key);
    if (val) val.push(a); // Map() {'HR':[emp1]}
    else map.set(key, [a]); // Set('HR', a);
  }
  return map;
};

assert.deepStrictEqual(
  users.groupByMap("dept"),
  Map.groupBy(users, (user) => user.dept)
);

Array.prototype.groupBy = function (prop) {
  const ret = { HR: [] };
  for (const a of this) {
    const key = a[prop];
    ret[key] ||= [];
    ret[key].push(a);
  }
  return ret;
  //   return this.groupMap()
  //     .entries()
  //     .reduce((acc, [kim, v]) => ({ ...acc, [k]: v }, {}));
};

assert.deepEqual(
  users.groupBy("dept"),
  Object.groupBy(users, (user) => user.dept)
);

// const g1 = Object.groupBy(users, (user) => user.dept);
// console.log(g1);
