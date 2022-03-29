create database cookieMainframe;

use cookieMainframe;

CREATE TABLE klienter (
	klient_id INT not null PRIMARY KEY AUTO_INCREMENT,
	navn VARCHAR(255) not null unique
);

CREATE TABLE resultat (
    resultat_id INT not null PRIMARY KEY AUTO_INCREMENT,
	klient_id INT not null,
	klikk int(8) not null,
    navn VARCHAR(255),
    tlf VARCHAR(11),
    created_at DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (klient_id) REFERENCES klienter(klient_id)
);

insert into klienter (navn) VALUES ("Peder");
insert into klienter (navn) VALUES ("Jonas");