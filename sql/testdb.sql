show tables;

show processlist;
kill 11;

desc DeptBackup;
show index from DeptBackup;

select * from Dept;

create table DeptBackup AS select * from Dept;
drop table DeptBackup;
-- truncate table Dept;
-- Error Code: 1701. Cannot truncate a table referenced in a foreign key constraint (`testdb`.`Emp`, CONSTRAINT `emp_ibfk_1`)
create table EmpBackup AS select * from Emp;
-- truncate table Emp;
insert into Emp select * from EmpBackup;
drop table EmpBackup;

select * from Emp;
-- delete from Tbl where id > 0;

select current_user();
create database schooldb;

create user school@'%' identified by 'Schooldb1';
grant all privileges on schooldb.* to school@'%';

select 256*256*256*256;

create table T (
	id tinyint unsigned auto_increment primary key,
    name varchar(30) not null,
    score enum('A','B','C','F') default 'F' comment '학점'
);

select * from T;
select * from T where score < 'C';

desc T;
insert into T(name, score) values ('Hong','A');
insert into T(name, score) values ('Kim','B'),('Lee','C');

insert into T(name) values ('Park');
insert into T(name, score) values ('Choi','F');

select * from T where score = 4;

alter table T modify column score enum('A','B','C','D','F') default 'F' comment '학점';

select * from T where score = 'F';

insert into T(name, score) values ('Han','D');

select last_insert_id();
select * from T where id = last_insert_id();

select 16 * 1024 * 4;
select 16382 * 4 + 8;  -- 65536
select 16382 * 4 + 4;
select 256 * 256;

select now(), sysdate(), curdate(), curtime(), unix_timestamp();
select now(), current_time(), current_date(), curdate(), current_timestamp();

select year(now()), month(now()), day(now()), now(3), now(5),
       hour(now()), minute(now()), second(now()), microsecond(now(6));

select second(now(3)), microsecond(now(3)) / 1000, microsecond(now(6));

show variables like '%time_zone%';    -- with system_time_zone

set time_zone = 'Asia/Seoul';
-- set global time_zone='UTC';

use testdb;
select * from Emp;

alter table Emp add column 
-- 	auth tinyint(1) not null default 9 comment '1:admin, 3: manager, 5:employee, 7:temporary, 9:guest'
    auth enum('admin', 'manager', 'employee', 'temporary', 'guest') not null default 'guest';

desc Emp;
select * from Dept;
alter table Dept add column captain int unsigned null comment '부서장';

alter table Dept add constraint foreign key fk_Dept_captain_Emp (captain)
	references Emp (id) on update cascade on delete set null;
    
create table EmailLog(
	id int unsigned not null auto_increment primary key,
    sender int unsigned not null,
    receivers varchar(1024),
    subject varchar(255),
    body text,
    foreign key fk_EmailLog_sender_Emp (sender)
		references Emp(id) on delete no action on update cascade
);
show create table EmailLog;
show index from EmailLog;

-- 외래키 관련 지워 줌
alter table EmailLog drop foreign key emaillog_ibfk_1;
alter table EmailLog drop index fk_EmailLog_sender_Emp;

-- MyISAM은 외래키 관련 삭제됨, 제약 안 걸림
alter table EmailLog engine = MyISAM;

select * from EmailLog;
show index from Emp;

-- 근데 여기서 외래키 제약을 걸려고 함, 실제로는 무시 됨
alter table EmailLog add constraint foreign key fk_EmailLog_sender_Emp (sender)
		references Emp(id) on delete no action on update cascade;

-- id 2에 뭐 추가
insert into EmailLog(sender, receivers, subject, body)
	values(2,'Hong, Kim', 'test mail','test mail body');

-- id 1 확인 -> 비어있음(사유 원래 없었음)
select * from Emp where id = 1;

-- Emp 테이블에 id = 1 인 데이터가 존재하지 않음에도
-- EmailLog.sender = 1 이 정상적으로 입력됨

-- 외래키(FK)가 정상적으로 동작하고 있었다면
-- 존재하지 않는 Emp.id 값을 참조하므로 INSERT는 실패해야 함

-- 하지만 EmailLog 테이블이 MyISAM 엔진이기 때문에
-- 외래키 제약이 실제로 생성되지 않았고,
-- 따라서 참조 무결성 검사가 수행되지 않아 정상 삽입된 것임
insert into EmailLog(sender, receivers, subject, body)
	values(1,'Hong, Kim', 'test mail','test mail body');

select * from EmailLog where id = 1;
