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

// 2. 댓글 모달창
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
