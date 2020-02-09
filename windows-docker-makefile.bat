{\rtf1\ansi\ansicpg1252\cocoartf2511
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red27\green29\blue31;\red235\green236\blue237;}
{\*\expandedcolortbl;;\cssrgb\c14118\c15294\c16078;\cssrgb\c93725\c94118\c94510;}
\margl1440\margr1440\vieww17060\viewh12500\viewkind0
\deftab720
\pard\pardeftab720\sl300\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 #! /bin/bash\
docker run --rm -it -p 2181:2181 -p 3030:3030 -p 8081:8081 -p 8082:8082 -p 8083:8083 -p 9092:9092 -e ADV_HOST=127.0.0.1 landoop/fast-data-dev}