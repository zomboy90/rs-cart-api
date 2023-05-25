create extension if not exists "uuid-ossp";
create type status_type as enum ('ORDERED', 'OPEN');

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	created_at date not null,
	updated_at date not null,
	status status_type
);

create table cart_items (
	cart_id uuid not null references carts(id),
	product_id uuid not null default uuid_generate_v4(),
	count integer
);

insert into carts (created_at, updated_at, status)
	values ('2023-05-21', '2023-05-22', 'ORDERED');

insert into cart_items (cart_id, count)
	values ('a7f5787c-fdeb-4572-ae8d-2e3ab3accbda', 5);
	
select * from carts;
select * from cart_items;
