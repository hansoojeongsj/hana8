SET FOREIGN_KEY_CHECKS = 0;
truncate table User;
truncate table Member; -- Member 테이블도 비우기 추가
truncate table Post;
SET FOREIGN_KEY_CHECKS = 1;

SET time_zone = 'Asia/Seoul';

-- 기존 User 데이터
insert into User(username, email, telno, bloodType, salhour)
values ('Hong', 'hong@gmail.com', '01012345678', 'A', 10000.00);

insert into User(username, email, telno, bloodType, salhour)
values ('kim', 'kim@gmail.com', '01012345679', 'B', 12000.00);

-- 신규 Member 데이터
insert into Member (nickname, email, passwd, isActive, bloodType)
values ('hong', 'hong@gmail.com', null, 1, 'A'),
       ('kim', 'kim@gmail.com', null, 0, 'B'),
       ('lee', 'lee@gmail.com', null, 1, 'AB');

insert into Post(title, writer, body)
values ('Title1', 'hong', 'body of Title1'),
       ('Title2', 'kim', 'body of Title2'),
       ('Title3', 'lee', 'body of Title3');
