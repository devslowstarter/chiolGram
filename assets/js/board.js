// 보드 생성
function bCreate() {
  const data = {
    boardContent: $('#boardContent').val(),
    boardHashtag: $('#boardHashtag').val(),
  };
  axios
    .post('http://localhost:3000/api/board', data)
    .then((response) => {
      console.log(data);
      alert('보드 생성 완료');
      // addBoardToList(boardTitle,boardContent)
      location.href = '../index.html';
    })
    .catch((error) => {
      alert('보드생성 실패');
      console.log(error);
    });
}
