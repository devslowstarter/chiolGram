// 1. 게시물 모달창
const boardBtn = document.getElementById('boardMakeBtn');
const boardmodal = document.getElementById('boardModalWrap');
const boardCloseBtn = document.getElementById('boardCloseBtn');

boardBtn.onclick = function () {
  boardmodal.style.display = 'block';
};
boardCloseBtn.onclick = function () {
  boardmodal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == boardmodal) {
    boardmodal.style.display = 'none';
  }
};

// 댓글 모달창
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');

btn.onclick = function () {
  modal.style.display = 'block';
};
closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// 3. 게시물 프론트-백 연결
function boardMake() {
  const data = {
    content: $('#boardContent').val(),
    hashtag: $('#boardHashtag').val(),
    image: $('#boardImage').val(),
  };
  console.log(data);
  axios
    .post('http://localhost:3000/api/board', data)
    .then((response) => {
      console.log(data);
      alert('여러분의 소중한 추억이 만들어졌습니다^^');
      location.href = '../index.html';
    })
    .catch((error) => {
      alert('게시물 생성 실패ㅠ_ㅠ'); // 로그인 실패 시 얼럿 메시지 표시
    });
  console.log(data);
}