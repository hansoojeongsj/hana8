use testdb;

select * from Emp;
select dept, count(*) from Emp group by dept;

-- std 표준편차, VARIANCE 분산 
select dept, count(*), avg(salary), sum(salary), std(salary), VARIANCE(salary)
  from Emp group by dept;

select dept, count(*), avg(salary) from Emp where dept < 5
 group by dept having avg(salary) > 500;
 
select dept, count(*) from Emp group by dept having count(*) >= 40;

-- 부서별 사원 수 계산, 서브쿼리로 부서 이름 가져오기, 사원 35명 이상만
select e.dept, count(e.ename), (select dname from Dept where id = e.dept)
  from Emp e
 group by e.dept having count(*) >= 35;
 -- group by e.dept having cnt >= 35;
select * from Emp;
select * from Dept;

select e.*, d.* from Emp e join Dept d on e.dept = d.id;
select e.dept, count(*), max(d.dname) from Emp e join Dept d on e.dept = d.id
 group by e.dept;
 
-- 부서 별 급여 평균이 전체 평균보다 높은 부서의 id와 평균 급여를 구하시오.
select avg(salary) from Emp;
select dept, avg(salary) from Emp group by dept;

select dept, avg(salary) avgsal from Emp
 group by dept having avgsal > (select avg(salary) from Emp);

select dept, avg(salary) avgsal, Dept.dname
  from Emp join Dept on Emp.dept = Dept.id
 group by dept having avgsal > (select avg(salary) from Emp);

select 251 * 7;
select * from Emp, Dept where Emp.dept = Dept.id;
select * from Emp inner join Dept on Emp.dept = Dept.id;

-- 전체 평균보다 더 높은 급여를 가진 직원 목록을 출력하시오.
-- (부서id, 부서명, 직원id, 직원명, 급여)
select e.dept, d.dname, e.id, e.ename, e.salary
  from Emp e inner join Dept d on e.dept = d.id
 where e.salary > (select avg(salary) from Emp);
 
select * from Emp
-- update Emp set salary = 900 + dept
  where id in (152, 97,18,80,133,47,128);
  
-- 부서 별 최고 급여자 목록을 추출하시오.
select e.*
  from Emp e inner join (select dept, max(salary) salary from Emp group by dept) d
             on e.dept = d.dept and e.salary = d.salary
 order by e.dept;

select * from Dept;
-- Dept 테이블에 부서 별로, 직원 이름이 가장 빠른 직원(가나다 순)을 
-- 각 부서의 captain으로 update 하시오
select * from Emp;

select e.dept, MIN(e.ename) AS captain_name, MIN(e.id) AS captain_id
	from Emp e
	group by e.dept;


alter table Dept add column captain int unsigned null;

select d.id as dept_id,
       d.dname,
       e.id as captain_id,
       e.ename as captain_name
  from dept d
  join emp e
    on e.id = (
        select id
          from emp
         where dept = d.id
         order by ename
         limit 1
    )
 order by d.id;
 
-- ex) Emp table에 outdt(퇴사일) 컬럼 추가
select * from Emp;

alter table Emp add column outdt date null;

select id, ename, dept, salary, auth,
if(outdt is null, '재직중', '퇴사') as outdt
  from Emp
 order by dept, id;

-- Emp.id가 3, 5 인 직원을 2025년 11월 25일자 퇴사 처리하시오.
/*
update Emp
   set outdt = '2025-11-25'
 where id in (3,5);
*/

-- Emp.id가 14, 26 인 직원을 오늘자 퇴사 처리하면서,
-- 만약 Dept.captain이 퇴사자면 공석으로 처리! (SQL문 1개로)
/*
update emp e
  left join dept d
    on d.captain = e.id
   set e.outdt = curdate(),
       d.captain = null
 where e.id in (14,26);
*/
