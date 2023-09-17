// 1. logout
function logout() {
  try {
    axios.post('http://localhost:3000/api/logout').then((response) => {
      alert('회원님! 살펴가십쇼!!');
    });
  } catch (error) {
    console.log(error);
  }
}

// 2. 게시물 값 가져오기
const data = {
  boardTitle: $('#boardTitle').val(),
  boardContent: $('#boardContent').val(),
};
axios
  .get('http://localhost:3000/api/board/get', data)
  .then((response) => {
    console.log(response);
    alert('보드 db get 완료');
    const dataArray = response.data.data;
    generateTableRows(dataArray);
  })
  .catch((error) => {
    alert('보드 정보 조회 실패!');
    console.log(error);
  });
