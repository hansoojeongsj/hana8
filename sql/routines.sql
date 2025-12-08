use schooldb;
select * from Subject;

-- 3번이 안 나옴
select *
	from Subject s inner join Prof p on s.prof = p.id;

-- 과목 쪽으로 left outer join, 과목 3까지 출력
select s.*, p.name profname
	from Subject s left outer join Prof p on s.prof = p.id;

select * from v_subject;

/*
create view v_subject AS
    select s.*, p.name profname, p.likecnt
      from Subject s left outer join Prof p on s.prof = p.id;
*/

-- trythis - view
-- Dept에 captain의 이름까지 보여주는 v_dept 뷰를 작성하시오.
use testdb;
create view v_dept AS
	select d.*, e.ename
		from Dept d left outer join Emp e on d.captain = e.id;
        
select * from v_dept;


use schooldb;
select * from Prof;
 
-- Prof 테이블에 subjectcnt 컬럼 추가하고, not null -> default 값 필요 
alter table Prof add column subjectcnt tinyint unsigned not null default 0;

select * from Subject;

select prof, count(*) from Subject group by prof;

-- insert, update 등 일 발생 -> 다른 일 동반 실행(trigger), 쿼리가 숨어있음
-- delete는 old만, 새로운 값이 들어오는건 new
delimiter //
create trigger tr_Subject_after_insert after insert on Subject for each row 
begin
	update Prof set subjectcnt = subjectcnt + 1
    where id = New.prof;
end //
delimiter ;

insert into Subject(name, prof) values('과목6', 2);
delete from Subject where id = 8;

show triggers like 'Subject';

-- delete
delimiter //
create trigger tr_Subject_after_delete after delete on Subject for each row 
begin
	update Prof set subjectcnt = subjectcnt - 1
    where id = OLD.prof;
end //
delimiter ;

-- update
delimiter //
create trigger tr_Subject_after_update after update on Subject for each row 
begin
	IF NEW.prof <> OLD.prof THEN
		update Prof set subjectcnt = subjectcnt + 1
        where id = New.prof;
		
		update Prof set subjectcnt = subjectcnt - 1
		where id = OLD.prof;
	END IF;
end //
delimiter ;

-- insert update delete triggers 확인
show triggers;

-- 초기화
-- 트리거 다 완성된 다음에 맞춰주는 작업 하기 
select * from Subject s inner join Prof p on s.prof = p.id;

select p.*, (select count(*) from Subject where prof = p.id) cnt from Prof p;

update Prof p set subjectcnt = (select count(*) from Subject where prof = p.id);

-- 테스트 
insert into Subject(name, prof) values('과목7', 3);
insert into Subject(name, prof) values('과목8', 3);

select * from Prof;
select * from Subject;

delete from Subject where id = 9;
update Subject set name='과목5to2', prof=2 where id=5;

-- view에 만들면, 서브쿼리로 하게 되어서 성능이 떨어짐
-- 성능면에서 좋지만, 관리와 보수에 어려움
