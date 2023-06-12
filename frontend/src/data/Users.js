const Users = {
    dnjsrbwls: {
        id: 'dnjsrbwls',
        password: '0000',
        name: '원규진',
        gender: 'female',
        birth: '20000808',
        phoneNumber: '01025817018',
        email: 'dnjsrbwls08@gmail.com',
        walletAddress: '0x3e8122ed5447a215cac91556dafd4b4186d46b4f',
        pointList: [
            {id: 12, point: 150, content: '인증서 발급1', date: '2023-02-05'},
            {id: 11, point: 180, content: '인증서 발급2', date: '2023-02-14'},
            {id: 10, point: 240, content: '인증서 발급3', date: '2023-03-11'},
            {id: 9, point: 160, content: '인증서 발급4', date: '2023-03-14'},
            {id: 8, point: -500, content: '물품 구매 - 아이스 카페 라떼 T', date: '2023-04-12'},
            {id: 7, point: -170, content: '물품 구매 - 빙그레)바나나우유240ML', date: '2023-04-20'},
            {id: 6, point: 240, content: '인증서 발급 - 민원안내 및 행정업무지원', date: '2023-05-08'},
            {id: 5, point: 180, content: '인증서 발급 - 민원안내 및 행정업무지원', date: '2023-05-08'},
            {id: 4, point: 100, content: '인증서 발급 - 사랑나누기 나눔 이웃활동', date: '2023-06-09'},
            {id: 3, point: -150, content: '물품 구매 - 아메리카노(Ice)', date: '2023-06-09'},
            {id: 2, point: -50, content: '포인트 선물', date: '2023-06-10'},
            {id: 1, point: 120, content: '인증서 발급 - 교육지원(학습지도 등)', date: '2023-06-10'},
            {id: 0, point: 60, content: '인증서 발급 - 교육지원(학습지도 등)', date: '2023-06-10'},
        ],
        certificationList: [
            {id: 8, volunteerDate: '2022-07-14', submitDate: '2023-02-05', hour: 150, point: 150, content: '인증서 발급1'},
            {id: 7, volunteerDate: '2022-06-28', submitDate: '2023-02-14', hour: 180, point: 180, content: '인증서 발급2'},
            {id: 6, volunteerDate: '2022-05-28', submitDate: '2023-03-11', hour: 240, point: 240, content: '인증서 발급3'},
            {id: 5, volunteerDate: '2022-05-23', submitDate: '2023-03-14', hour: 160, point: 160, content: '인증서 발급4'},
            {id: 4, volunteerDate: '2015-04-18', submitDate: '2023-04-08', hour: 240, point: 240, content: '민원안내 및 행정업무지원'},
            {id: 3, volunteerDate: '2015-04-24', submitDate: '2023-05-08', hour: 180, point: 180, content: '민원안내 및 행정업무지원'},
            {id: 2, volunteerDate: '2016-08-28', submitDate: '2023-06-09', hour: 90, point: 90, content: '사랑나누기 나눔 이웃활동'},
            {id: 1, volunteerDate: '2017-11-05', submitDate: '2023-06-10', hour: 120, point: 120, content: '교육지원(학습지도 등)'},
            {id: 0, volunteerDate: '2017-11-05', submitDate: '2023-06-10', hour: 60, point: 60, content: '교육지원(학습지도 등)'},
        ],
        purchaseList: [
            {id: 2, isUsed: false, purchaseDate: '2023-06-09', productInfo: {id: 8, brand: '컴포즈커피', productName: '아메리카노(Ice)'}},
            {id: 1, isUsed: true, purchaseDate: '2023-04-20', productInfo: {id: 17, brand: 'CU', productName: '빙그레)바나나우유240ML'}},
            {id: 0, isUsed: true, purchaseDate: '2023-04-12', productInfo: {id: 3, brand: '스타벅스', productName: '아이스 카페 라떼 T'}},
        ],
    },
    test: {
        id: 'test',
        password: 'test',
        name: '테스트',
        gender: 'male',
        birth: '19990101',
        phoneNumber: '01012345678',
        email: 'test@gmail.com',
        walletAddress: '',
        totalPoints: 0,
        pointList: [
        ],
        certificationList: [
        ],
        purchaseList: [
        ],
    },
};


export default Users;