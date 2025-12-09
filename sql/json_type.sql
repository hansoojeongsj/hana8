-- JSON 1
alter table Emp add column remark json;

select * from Emp where id <= 5;

update Emp set remark = '{"id": 2, "age": 30, "fam": [{"id": 1, "name": "유세차"}]}'
 where id = 2;

update Emp set remark = '{"id": 3, "age": 33, "fam": [{"id": 1, "name": "유세차"}, {"id":2, "name": "홍길숭"}]}'
 where id = 3;

update Emp set remark = '{"id": 4, "age": 34, "fam": [{"id": 1, "name": "유세차"}]}'
 where id = 4;

update Emp set remark = json_object( 'id', 5, 'age', 44, 
                          'fam', json_array(
                              json_object('id', 1, 'name', '지세차'),
                              json_object('id', 2, 'name', '지세창')   )  )
 where id = 5;

-- select id, remark->'$.age' from Emp where id <= 5;
select id, remark->'$.age', json_extract(remark,'$.age'),
	remark->'$.fam[0 to 2].name',
    remark->>'$.fam[0].name',
    remark->'$.fam[last-1].name',
	remark->'$.fam[*]'
    from Emp where id <= 5;

select json_pretty(remark) from Emp where id <= 5;
-- JSON.stringify(remark, null, ' ')

select id, ename, remark->'$.age', remark->'$.fam' as family,
    json_unquote(remark->'$.fam[0].name'), remark->'$.fam[0 to 2]', remark->'$.fam[last - 1 to last].name',
    remark->>'$.fam[0].name', remark->>'$.fam[last].name', remark->>'$.fam[last - 1].name'
  from Emp
  where json_object('id', 1, 'name', '유세차') member of (remark->'$.fam');

select * from Emp where '유세차' member of (remark->'$.fam[*].name');

select * from Emp where remark->'$.fam[*].name' like '%세%';

select d.*, e.remark
	from Dept d inner join Emp e on d.id = e.remark->'$.id';
    

-- JSON 2
select json_search(remark, 'one', '유세차'), json_value(remark, '$.fam[0].name'),
    json_extract(remark, '$.fam', '$[*]'), remark->>'$.fam[0].name'
  from Emp where id <= 5;

select json_search(remark, 'one', '유세차'), -- one | all
    json_extract(remark, '$.fam', '$[*]'), remark->>'$.fam[0].name'
  from Emp where id <= 5;
  
select json_value(remark, json_search(remark, 'one', '유세차'))
  from Emp where json_search(remark, 'all', '유세차');

update Emp set remark = json_insert(remark, '$.addr', 'Seoul') where id = 2;

-- 이건 잘 안되고 있음
-- fam이 이미 있기 때문
-- fam이 있는 곳에 넣으려면 json_set 
update Emp set remark 
   = json_insert(remark, '$.fam', json_array(json_object('id', 1, 'name', '유세홍')))
 where id = 2;

-- 단순 확인용 
select * from Emp where id <=8;

-- 이건 성공 
update Emp set remark
   = json_array_append(remark, '$.fam', json_object('id', 2, 'name', '유세이'))
 where id = 2;

--
update Emp set remark = null where id = 7;
update Emp set remark = json_object('id', 6) where id = 6;
update Emp set remark = json_object('id', 7) where id = 7;

-- 
update Emp set remark = json_set(remark, '$.fam[1].name', '새로이') where id = 2;

update Emp set remark = JSON_REMOVE(remark, '$.addr') where id = 2;
update Emp set remark = '[1,2,3]' where id = 4;
-- 값이 2가 있는 
select * from Emp where 2 member of (remark->'$');

-- JSON 3
select remark from Emp where id in (2, 3, 4);
select remark from Emp where remark->'$.fam[1].name' = '새로이';

select JSON_STORAGE_SIZE(remark) from Emp;

select e.*, d.dname
  from Emp e inner join Dept d on e.remark->'$.fam[0].id' = d.id
 where json_length(e.remark->'$.fam') > 0;

select * from Emp
 where '유세차' member of (remark->>'$.fam[*].name');

select remark->>'$.fam[*].name' from Emp
 where id <= 5;

select * from Emp where remark->>'$.fam[0].name' like '%세차';

-- 이미 있는 값을 JSON으로 만들어 줌 
select JSON_OBJECTAGG(dname, id) from Dept d;
select JSON_OBJECTAGG(dname, (select count(*) from Emp where dept = d.id)) from Dept d;
