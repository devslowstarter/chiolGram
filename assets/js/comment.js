// 1. 좋아요 기능
function addLike() {
  const pushHeartBtn = document.querySelector('.heartBtn');
  pushHeartBtn.innerHTML = '<i class="xi-heart xi-2x"></i>';
  pushHeartBtn.style.color = 'red';
  pushHeartBtn.addEventListener('click', countPlus);
}

// 2. 버튼을 누르면 숫자가 올라가게..!
let count = 0;
function countPlus() {
  count = count + 1;
  document.querySelector('.like').innerHTML = '좋아요 ' + count + '개';
}

// 3. 댓글 추가
const postReviewBtn = document.querySelector('.cmtSendBtn');
const addReview = document.querySelector('.cmtWrite');
const newReview = document.querySelector('.cmts');
const boardSize = document.querySelector('.board');
const commenter = ['uuu', 'pdds', 'hooe', 'ddwwe']; //db

function uploadReview() {
  if (addReview.value.length > 0) {
    const newComment = document.createElement('li');
    const deleteBtn = document.createElement('removeComment');
    const likeBtn = document.createElement('likeHeart');
    const commentervalue = Math.floor(Math.random() * commenter.length); //배열 길이만큼 무작위로 값을 생성
    const commenterPick = commenter[commentervalue]; //무작위로 생성된 값을 고르도록
    newComment.innerHTML = commenterPick + ' ' + addReview.value;
    newReview.appendChild(newComment);
    newReview.style.fontSize = 'small';
    likeBtn.innerHTML = '<i class="xi-heart-o"></i>';
    newComment.appendChild(likeBtn);
    likeBtn.style.cursor = 'pointer';
    likeBtn.style.float = 'right';
    likeBtn.style.marginLeft = '-0.9rem';
    likeBtn.style.marginRight = '0.8rem';
    likeBtn.addEventListener('click', pushHeart);
    deleteBtn.innerHTML = '<i class="xi-trash-o"></i>';
    newComment.appendChild(deleteBtn);
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.float = 'right';
    deleteBtn.addEventListener('click', removeComm);
    addReview.value = '';
    addReview.focus();
  } else {
    alert('댓글을 입력해 주세요');
  }
}

// 4. 엔터키로 댓글 입력!
// addReview.addEventListener('keypress', (e) => {
//   if (addReview.value.length !== 0) {
//     uploadReview();
//   }
// });

// 5. 공유하기 기능
function clip() {
  let url = '';
  const textarea = document.createElement('textarea');

  document.body.appendChild(textarea);
  url = window.document.location.href;
  textarea.value = url;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert('URL이 복사되었습니다.');
}

// 최종 출력 ▽
