USE hackathon_2022;

create table admins(
admin_id int primary key auto_increment not null, 
admin_name varchar(50) not null, 
birth_date date ,
adress varchar(50) not null,
imp varchar (13) not null,
email varchar (20) not null,
username varchar(20) not null,
pasword varchar(50) not null
);

create table users(
user_id int primary key auto_increment not null, 
user_name varchar(50) not null, 
birth_date date ,
adress varchar(50) not null,
imp varchar (13) not null,
email varchar (20) not null,
username varchar(20) not null,
pasword varchar(50) not null
);
DROP TABLE posts;
create table posts(
post_id int primary key auto_increment not null, 
title varchar(50) not null, 
date_published date ,
location varchar(50) not null,
description varchar(5000) not null,
user_id int not null,
category varchar(50) not null,
subcategory varchar(50) not null,
adminACC INT not null
);
DROP table selected_posts;
create table selected_posts(
selected_post_id int primary key auto_increment not null, 
adminACC INT not null,
post_id int not null,
foreign key (post_id) references posts(post_id)
)

