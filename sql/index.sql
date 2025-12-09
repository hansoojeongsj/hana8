-- use testdb;
select * from Emp where dept = 2;

explain select * from Emp where dept = 2;
explain select * from Emp where id = 2;
explain select * from Emp where ename =''; -- rows 251 -> 전체

-- Emp table에 idx_Emp_ename_dept, index 추가함
-- dept를 먼저, ename을 나중 선택(일반적)

-- row 2개 -> 더 빨리 찾음  
explain select * from Emp where ename like '김%' and dept = 2;
-- row 32개 
explain select * from Emp where dept = 2;

explain select * from Emp where id > 0 and ename=''; -- 얘는 index도 찾고 ename도 찾음 
show index from Emp;

explain select * from Emp where substring(ename, 2) = '신신';

select substring(ename, 2) from Emp;

-- 
use schooldb;
select substring(mobile, -4) from Student;

alter table Student add index (
	(substring(mobile, -4))
);

-- emp table을 Emp로,
-- 한번에 바꿀 수 없었음 둘을 같게 봐서
rename table emp to emp_tmp;
rename table emp_tmp to Emp;

-- functional_index로 잡혀있음
-- 데이터보다 index가 더 커질 수도 있어서, index가 전체의 15%는 넘지 않는게 좋음 
explain select * from Student where substring(mobile, -4) = '1012';

-- 이메일이 pk
-- 이메일 바뀔 때마다 인덱스 구조 재정렬 → 성능 부담 커짐
-- insert도 중간에 끼워 넣어야 해서 비용 큼
-- 그래서 PK는 잘 안 바뀌는 값이 좋음
-- 문자열 비교는 collation 비교 때문에 비용이 큼
-- binary는 바이트 단위 비교라서 더 빠름

--
select * from Student s where exists(select * from Student where major > s.major);