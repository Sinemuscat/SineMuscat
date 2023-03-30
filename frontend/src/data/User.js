const User = {
    id: 'dnjsrbwls',
    password: '0000',
    name: '원규진',
    gender: 'female',
    birth: '20000808',
    phoneNumber: '01025817018',
    email: 'dnjsrbwls08@gmail.com',
    walletAddress: '',
    totalPoints: 185,
    pointList: [
        {id: 0, point: 150, content: '인증서 발급1', date: '20230205'},
        {id: 1, point: -5, content: '포인트 선물', date: '20230210'},
        {id: 2, point: -100, content: '물품 구매 - 아메리카노 T', date: '20230310'},
        {id: 3, point: 100, content: '인증서 발급2', date: '20230311'},
        {id: 4, point: 200, content: '인증서 발급3', date: '20230314'},
        {id: 5, point: -50, content: '물품 구매 - 츄파춥스', date: '20230320'},
        {id: 6, point: -110, content: '물품 구매 - 카페라떼 T', date: '20230322'},
    ],
    certificationList: [
        {id: 0, volunteerDate: '20221014', submitDate: '20230205', hour: 10, point: 150, content: '인증서 발급1'},
        {id: 1, volunteerDate: '20230123', submitDate: '20230311', hour: 5, point: 100, content: '인증서 발급2'},
        {id: 2, volunteerDate: '20230228', submitDate: '20230314', hour: 20, point: 200, content: '인증서 발급3'},
    ],
    purchaseList: [
        {id: 0, isUsed: true, purchaseDate: '20230310', productInfo: {brand: '스타벅스', productName: '아메리카노 T'}},
        {id: 1, isUsed: true, purchaseDate: '20230320', productInfo: {brand: 'CU', productName: '츄파춥스'}},
        {id: 2, isUsed: false, purchaseDate: '20230322', productInfo: {brand: '스타벅스', productName: '카페라떼 T'}},
    ],
};


export default User;