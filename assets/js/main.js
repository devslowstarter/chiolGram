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
  author: $('#userId').val(),
  createAt: $('#createAt').val(),
  content: $('#boardContent').val(),
  hashtag: $('#boardHashtag').val(),
  image: $('#image').val(),
};
// axios
//   .get('http://localhost:3000/api/board', data)
//   .then((response) => {
//     alert('보드 db get 완료');
//     const dataArray = response.data.data;
//     dataArray.forEach((postInfo) => {
//       createPost(postInfo);
//     });
//   })
//   .catch((error) => {
//     alert('보드 정보 조회 실패!');
//     console.log(error);
//   });

// 3. 게시물을 생성하는 함수
function createPost(postInfo) {
  const board = document.createElement('div');
  board.classList.add('board');

  const boardHeader = document.createElement('div');
  boardHeader.classList.add('boardHeader');
  const boardTitle = document.createElement('ul');
  boardTitle.classList.add('boardTitle');

  // 작성자 정보 생성
  const authorLi = document.createElement('li');
  const authorLink = document.createElement('a');
  authorLink.href = '#';
  authorLink.textContent = postInfo.author;
  authorLi.appendChild(authorLink);

  // 날짜 정보 생성
  const dateLi = document.createElement('li');
  dateLi.textContent = postInfo.date;

  // 게시물 헤더에 작성자 정보와 날짜 정보 추가
  boardTitle.appendChild(authorLi);
  boardTitle.appendChild(dateLi);
  boardHeader.appendChild(boardTitle);

  // 게시물 내용 생성
  const boardBody = document.createElement('div');
  boardBody.classList.add('boardBody');
  const image = document.createElement('img');
  image.src = './images/exampleImg.jpeg';
  image.alt = '예시사진';
  boardBody.appendChild(image);

  // 게시물 푸터 생성
  const boardFooter = document.createElement('div');
  boardFooter.classList.add('boardFooter');
  const remote = document.createElement('ul');
  remote.classList.add('remote');

  // 좋아요 버튼 생성
  const likeLi = document.createElement('li');
  const likeButton = document.createElement('a');
  likeButton.classList.add('heartBtn');
  likeButton.innerHTML = '<i class="xi-heart-o xi-2x"></i>';
  likeButton.addEventListener('click', addLike);
  likeLi.appendChild(likeButton);

  // 댓글 버튼 생성
  const commentLi = document.createElement('li');
  const commentButton = document.createElement('a');
  commentButton.classList.add('cmtBtn');
  commentButton.id = 'popupBtn';
  commentButton.innerHTML = '<i class="xi-comment-o xi-2x"></i>';
  commentLi.appendChild(commentButton);

  // 공유 버튼 생성
  const shareLi = document.createElement('li');
  const shareButton = document.createElement('a');
  shareButton.addEventListener('click', clip);
  shareButton.innerHTML = '<i class="xi-share-alt-o xi-2x"></i>';
  shareLi.appendChild(shareButton);

  // 푸터에 버튼들 추가
  remote.appendChild(likeLi);
  remote.appendChild(commentLi);
  remote.appendChild(shareLi);
  boardFooter.appendChild(remote);

  // 기타 정보 생성 (좋아요 수, 게시물 내용, 해시태그)
  const etc = document.createElement('div');
  etc.classList.add('etc');
  const likeCount = document.createElement('div');
  likeCount.classList.add('like');
  likeCount.id = 'likeCount';
  likeCount.textContent = postInfo.likeCount;
  const boardContent = document.createElement('div');
  boardContent.classList.add('boardContent');
  boardContent.textContent = postInfo.content;
  const boardHashtag = document.createElement('div');
  boardHashtag.classList.add('boardHashtag');
  boardHashtag.textContent = postInfo.hashtag;

  // 기타 정보를 기타 요소에 추가
  etc.appendChild(likeCount);
  etc.appendChild(boardContent);
  etc.appendChild(boardHashtag);

  // 댓글 공간 생성
  const cmtSpace = document.createElement('div');
  cmtSpace.classList.add('cmtSpace');
  const cmts = document.createElement('ul');
  cmts.classList.add('cmts');
  cmts.id = 'cmts';
  const cmtSend = document.createElement('div');
  cmtSend.classList.add('cmtSend');
  cmtSend.id = 'cmtSend';

  // 댓글 입력란 생성
  const cmtWrite = document.createElement('input');
  cmtWrite.type = 'text';
  cmtWrite.classList.add('cmtWrite');
  cmtWrite.id = 'cmtWrite';
  cmtWrite.placeholder = '댓글입력';

  // 댓글 전송 버튼 생성
  const cmtSendBtn = document.createElement('input');
  cmtSendBtn.type = 'button';
  cmtSendBtn.classList.add('cmtSendBtn');
  cmtSendBtn.id = 'cmtSendBtn';
  cmtSendBtn.value = '게시';
  cmtSendBtn.addEventListener('click', uploadReview);

  // 댓글 입력란과 버튼을 댓글 공간에 추가
  cmtSend.appendChild(cmtWrite);
  cmtSend.appendChild(cmtSendBtn);

  // 댓글 공간을 게시물에 추가
  cmtSpace.appendChild(cmts);
  cmtSpace.appendChild(cmtSend);

  // 게시물에 모든 요소를 추가
  board.appendChild(boardHeader);
  board.appendChild(boardBody);
  board.appendChild(boardFooter);
  board.appendChild(etc);
  board.appendChild(cmtSpace);

  // 생성된 게시물을 원하는 부모 요소에 추가
  const boardContainer = document.getElementById('content');
  boardContainer.appendChild(board);
}

// 페이지 로드 시 게시물 생성
window.onload = () => {
  axios
    .get('http://localhost:3000/api/board')
    .then((response) => {
      console.log(response.data);
      alert('보드 db get 완료');
      const dataArray = response.data.data;
      dataArray.forEach((postInfo) => {
        createPost(postInfo);
      });
    })
    .catch((error) => {
      alert('보드 정보 조회 실패!');
      console.log(error);
    });
};
