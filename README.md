# Instalation

## Database
You will need a PostgreSQL database running and a 'posts' table, here is the schema:
**if needed please find the table sql in `table.sql`**

    CREATE  TABLE  IF  NOT  EXISTS  public.posts
    (
	    id smallint  NOT NULL  GENERATED  ALWAYS  AS  IDENTITY ( INCREMENT 1  START  1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
	    email text  COLLATE pg_catalog."default"  NOT NULL,
	    comment text  COLLATE pg_catalog."default"  NOT NULL,
	    CONSTRAINT posts_pkey PRIMARY KEY (id)
    )


## Express API


Please add a .env file inside ./backend folder with these varaibles to integrate your db

DB_HOST=
DB_PORT=
DB_USER=
DB_DATABASE=
DB_PASSWORD=
PORT=5001

go to `backend` folder and run 

    npm install

to run

    npm run dev

## React APP
go to `ui` folder and run 

    npm install

to run

    npm run dev