use schooldb;
/*
한글 상태에서 복사 안됨 !!!!! 영어 자판으로 바꾸고 하기 
*/
-- name이 unique key
show index from Major;
select * from Major;
insert into Major(name) values ('경영학과');

-- id 순서로 sorting
select * from Major order by id;

-- Error Code: 1062. Duplicate entry '경영학과' for key 'major.uniq_Major_name'
insert into Major(name) values ('경영학과');

-- 0 row(s) affected, 1 warning(s): 1062 Duplicate entry '경영학과' for key 'major.uniq_Major_name'
insert ignore into Major(name) values('경영학과');

alter table Major add column updatedata timestamp
	default current_timestamp on update current_timestamp
    after id;
    
-- default '' 포함 
alter table Major add column building varchar(15) not null;

-- 기존 '건축과' -> '건축공학과'
update Major set name = '건축공학과' where id = 3;

-- 설정 변경 이후 Query -> Reconnect to Server 해줘야 설정 반영
-- safe update 설정 바꾸고 reconnect 안해서 막혀있었음
update Major set building = '공학관'
	-- select * from Major
    where name like '%공학과';

update Major set building = '인문관' where building ='';

-- 한 줄에 수정
-- update Major set building = (case when name like '%공학과' then '공학관' else '인문관'

insert into Major(name, building) values('경제학과', '인문관');

insert into Major(name, building) values('경제학과', '인문관')
	on duplicate key update building = '인문관';
    
-- @@ : 전역 

show create table Major;
/*
CREATE TABLE `Major` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `updatedata` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `building` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_Major_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
*/

alter table Major auto_increment = 8;

select * from Student;
select * from testdb.Emp;

select ename, dept from testdb.Emp limit 5;

desc Student;

insert into Student (name, birthdt, major, email, mobile, gender)
select ename, concat('2000-12-', id), dept % 4 + 1, 
	concat(ename,'@gmail.com'), concat('0101234', id+1000), id%2
	from testdb.Emp
	where id between 10 and 31 limit 30; -- id >= 10 and id <= 31

-- 
select * from Prof;
insert into Prof(name) values ('김교수'),('박교수'),('최교수'),('이교수'),('한교수');

select * from Subject;

-- select concat ('과목',id), id from Prof order by rand();
insert into Subject(name, prof)
select concat ('과목',id), id from Prof;

select * from Enroll;

insert into Enroll(student, subject)
select id, (select id from Subject order by rand() limit 1)
	from Student order by rand();

-- insert into Enroll(subject, student)
select id, (select id from Student order by rand() limit 1)
	from Subject order by rand();
    
select s.id as x, (select id from Student where id <> s.id order by rand() limit 1) y
	from Student s order by s.id;

select x.id, y.id
	from Student x join Student y on x.id <> y.id;

select * from Student S;

-- name 있으면 pk 순서 -> id와 rn이 같게 보임
select s2.id, s2.name, (@rownum := @rownum + 1) rn
	from Student s2, (select @rownum := 0) rnum;

select * from Major;

select s1.id
	from Student s1;

-- join, @rownum 이용해서 짝꿍 배정	
select s1.id, (case when s1.id = s2.id then '-' else s2.id end), if(s1.id = s2.id, 'X', 'Y')
  from Student s1 join (select s2.id, (@rownum := @rownum + 1) rn
                          from Student s2, (select @rownum := 0) rnum) s2
                    on s1.id = s2.rn
	order by rand();
                    
select *, (case when building = '인문관' then 1
                when building = '공학관' then 2
                else 0 end) building_code
  from Major;
  
select m.*, (case building
             when '인문관' then 1
             when '공학관' then 2
             else 0 end) building_code
  from Major m;
  
select *, if(building = '인문관', 1, if(building = '공학관', 2, 0)) from Major;

select * from Subject;
select * from Prof;

update Subject set prof = null where id = 3;

select s.*, (select name from Prof where id = s.prof) from Subject s;
select s.*, ifnull((select name from Prof where id = s.prof), '공석') from Subject s;
-- 서브쿼리가 행을 못 찾으면 NULL이므로 바깥 IFNULL만 효과 있음
-- select s.*, (select ifnull(name, '공석') from Prof where id = s.prof) from Subject s;
-- 서브쿼리는 성능이 안 좋음 -> select 횟수가 많아서

select * from Subject where prof in (2, 4); -- prof = 2 or prof = 4

-- ALL: 제일 작은 수보다 작은, ANY: 제일 큰 수보다 작은-- ALL: 제일 큰 수보다 큰, ANY: 제일 작은 수보다 큰
select * from Subject where prof < ANY(select id from Prof where id % 2 = 0);
select * from Subject where prof < (select max(id) from Prof where id % 2 = 0);
select * from Subject where prof < (select min(id) from Prof where id % 2 = 0);
select * from Subject where prof = (select min(id) from Prof where id % 2 = 0);

-- 전체 텍스트에서 검색은 FULLTEXT 인덱스
select * from Student where name not like '김%'; -- ^김.*
select * from Student where name like '_마%'; -- .{1}마.*
select * from Student where name like '%나';  -- .*나$

-- count는 집계함수 -> group by 필요
select distinct building, count(*) from Major;

select building, count(*), max(name) from Major group by building;
select building '건물명', count(*) '학과 개수', group_concat(name order by name separator ', ') '학과'
  from Major group by building;


select * from Student order by id desc limit 0, 10; -- 1 page
select * from Student order by id desc limit 10, 10; -- 10 * (pageNo - 1), 10
select * from Student order by id desc limit 10, 10; -- 3 page

select * from Student where id > 0 order by id limit 5;
select * from Student where id > 10 order by id limit 5;
select * from Student where id > 15 order by id limit 5;

select * from Subject;
select * from Subject s inner join Prof p on s.prof = p.id;
-- 3 null 인데, 3번 과목도 보고 싶음
-- 과목 전체 목록에 담당 교수가 있으면 교과명 출력
select * from Subject s left outer join Prof p on s.prof = p.id;
