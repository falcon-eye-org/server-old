--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: UserEvents; Type: TABLE; Schema: public; Owner: todoapp
--

CREATE TABLE public."UserEvents" (
    "idUser" character varying(36),
    session character varying(36),
    event json
);


ALTER TABLE public."UserEvents" OWNER TO todoapp;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: todoapp
--

CREATE TABLE public."Users" (
    "idUser" character varying(36) NOT NULL,
    identifier character varying
);


ALTER TABLE public."Users" OWNER TO todoapp;

--
-- Name: Users Users_identifier_key; Type: CONSTRAINT; Schema: public; Owner: todoapp
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_identifier_key" UNIQUE (identifier);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: todoapp
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("idUser");


--
-- PostgreSQL database dump complete
--

