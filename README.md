
## Reservation app

### 소개
- 회의실과 날짜, 사용 시간을 입력하여 회의실을 예약하는 회의실 예약 애플리케이션.

### 기능
- 예약 시간은 정시, 30분을 기준으로 시작하여 30분 단위로 예약 가능
- 예) 13:00 ~ 16:30 예약, 17:00 ~ 17:30 예약
- 13:05 ~ 14:10 과 같이 정시, 30분 시작이 아닌 경우 예약 불가능
- 1회성 예약과 주 단위 반복 예약 설정 가능
- 반복 예약 시 선택한 날짜의 요일 마다 반복, 반복 횟수 지정 필수(반복 횟수는 예약에 포함됨)
- 예) 2018년 5월 31일(목) 14:00 ~ 15:00 반복 예약 시 지정한 종료일까지 매주 목요일에 반복 예약
- 동일한 회의실에 중첩된 일시로 예약 불가
- 종료 시각과 시작 시각이 겹치는 경우는 중첩으로 판단하지 않음
- 예) 동일 날짜, 회의실에 대해 14:00 ~ 15:00, 15:00 ~ 16:00 두 건은 예약가능
- 다수의 사용자가 동시에 동일 날짜, 회의실에 예약할 때 일시가 중첩되어 예약될 수 없고, 서버에서 먼저 처리되는 1건만 예약

## Live demo
![Alt text](https://user-images.githubusercontent.com/5827617/44310931-85c1ac00-a419-11e8-8b41-38f65ea702d7.gif)
- [Online demo](http://13.76.166.152:3002/)
- [frontend](https://github.com/june2/reservation-app/tree/master/frontend)
- [backend (node)](https://github.com/june2/reservation-app/tree/master/backend-node)
- [backend (java)](https://github.com/june2/reservation-app/tree/master/backend-java)

## 사용 기술
- Back-end : Node.js, Java
- Front-end : React.js


## 진행 사항
- [x]  Node Server api 구축
- [x]  Node Server unit test
- [x]  Node Server data validation 
- [x]  Java Server api 구축
- [ ]  Java Server unit test
- [ ]  Java Server data validation 
- [x]  front web ui/ux 웹화면 페이지 구현
- [ ]  front unit test
- [ ]  authorization 인증 구현
