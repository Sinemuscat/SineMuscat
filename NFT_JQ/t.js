const unixTimestamp = 1633106090; // 블록체인에서 얻은 Unix timestamp 값
const date = new Date(unixTimestamp * 1000); // Date 객체 생성 (자바스크립트는 밀리초를 기반으로 하므로 1000을 곱해줍니다.)

console.log(date.toISOString()); // ISO 형식의 날짜 및 시간 출력
console.log(date.toLocaleString()); // 로컬 형식의 날짜 및 시간 출력
