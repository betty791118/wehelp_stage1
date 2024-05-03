#1
```
CREATE DATABASE website; 
USE website;
```
![1](https://raw.githubusercontent.com/betty791118/wehelp_stage1/main/week5/create%20db_again.png)

#2
'''
CREATE TABLE `member` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `follower_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `time` DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
'''

#3
'''
INSERT INTO member (name, username, password) VALUES ('test', 'test', 'test');
INSERT INTO member (name, username, password) VALUES ('cindy', 'cindy1', '1234');
INSERT INTO member (name, username, password) VALUES ('betty', 'betty2', '1234');
INSERT INTO member (name, username, password) VALUES ('peter', 'peter3', '1234');
INSERT INTO member (name, username, password) VALUES ('lulu', 'lulu4', '1234');
'''

#4
'''
SELECT *FROM member ORDER BY time DESC;
'''

#5
'''
SELECT *FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;
'''

#6
'''
SELECT * FROM member WHERE username='test'
'''
#7
'''
SELECT * FROM member WHERE name LIKE '%es%';
'''

#8
'''
SELECT *FROM member LIMIT 3 OFFSET 1;
'''

#9
'''
SELECT *FROM member WHERE username = 'test' AND password = 'test';
'''

#10
'''
UPDATE member SET name="test2" WHERE username='test';
'''

#11
'''
SELECT COUNT(*) FROM member;
'''

#12
'''
SELECT SUM(follower_count) FROM member;
'''

#13
'''
SELECT AVG(follower_count) FROM member;
'''

#14
'''
SELECT *FROM member ORDER BY follower_count DESC LIMIT 2;
'''

#15
'''
CREATE TABLE `message` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    `member_id` BIGINT NOT NULL,
    FOREIGN KEY (`member_id`) REFERENCES `member`(`id`),
    `content` VARCHAR(255) NOT NULL,
    `like_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `time` DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
'''
#16
'''
INSERT INTO message (member_id, content, like_count) VALUES (1, 'I am so happy', 10);
INSERT INTO message (member_id, content, like_count) VALUES (2, 'This is not good', 100);
INSERT INTO message (member_id, content, like_count) VALUES (3, 'It is so hard', 50);
INSERT INTO message (member_id, content, like_count) VALUES (4, 'I don''t want to work', 10);
INSERT INTO message (member_id, content, like_count) VALUES (5, 'Let''s quit', 200);
INSERT INTO message (member_id, content, like_count) VALUES (2, 'why??', 300);
INSERT INTO message (member_id, content, like_count) VALUES (4, 'What!', 120);
INSERT INTO message (member_id, content, like_count) VALUES (3, 'OMG', 10);
'''

#17
'''
SELECT message.id, message.member_id, message.content, message.like_count, message.time, member.name FROM message JOIN member ON message.member_id = member.id;
'''
#18
'''
SELECT message.id, message.member_id, message.content, message.like_count, message.time, member.name FROM message JOIN member ON message.member_id = member.id where member.username = 'test';
'''

#19
'''
SELECT AVG(like_count) FROM message JOIN member ON message.member_id = member.id where member.username = 'test';
'''

#20
'''
SELECT member.username, AVG(like_count) FROM message 
JOIN member ON message.member_id = member.id 
group by username;
'''
