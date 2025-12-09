select * from Dept;
alter table Dept add column empcnt smallint not null default 0;

show triggers like 'Emp';
-- drop trigger tr_emp_after_ ;

create trigger tr_emp_after_insert after insert on Emp for each row
	update Dept set empcnt = empcnt + 1
    where id = NEW.dept;

create trigger tr_emp_after_delete after delete on Emp for each row
	update Dept set empcnt = empcnt - 1
    where id = OLD.dept;
    
delimiter $$ 
create trigger tr_emp_after_update after update on Emp for each row
begin
	-- update Dept set empcnt = empcnt + 1 where NEW.dept;
	-- update Dept set empcnt = empcnt - 1 where OLD.dept;
    IF NEW.dept <> OLD.dept THEN
		update Dept set empcnt = empcnt + if(id = NEW.dept, 1, -1)
			where id in (NEW.dept, OLD.dept);
	END IF;
end $$
delimiter ;
