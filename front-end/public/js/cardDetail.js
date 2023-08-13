const id = new URL(document.location.href).searchParams.get('id'); // cardId
const cardTitle = document.getElementById('card-title');
const cardDescription = document.getElementById('card-description');
const cardDeadline = document.getElementById('card-deadline');
const commentBox = document.getElementById('comment-box');
const card = document.getElementById('card');
const cardBody = document.getElementById('cardBody');

document.addEventListener('DOMContentLoaded', async () => {
  const options = {
    method: 'GET',
    credential: 'includes',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(
    `http://localhost:8080/cards?id=${id}`,
    options,
  ).then((res) => res.json());
  cardTitle.innerHTML = 'Title : ' + result.data.title;
  cardDescription.innerHTML = 'Description : ' + result.data.description;
  cardDeadline.innerHTML = 'Deadline : ' + result.data.deadline;
  card.setAttribute('style', `background-color:${result.data.color}`);
  result.data.comments.forEach((d) => {
    commentBox.innerHTML += `
    <li>
      <div id="${d.id}">
      <label for="${d.id}">${d.user.name} :&nbsp;&nbsp;</label>
      ${d.comment} <button id="deleteCommentBtn" type="button" class="btn btn-close" onclick="deleteComment(this.parentElement)" />
      </div>
    </li>
    `;
  });
  if (result.data.workers.length !== 0) {
    const memberDiv = document.createElement('div');
    memberDiv.innerHTML = `
    <h3 style="color:#4f0303">Members</h3>
    `;
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'workers');
    ul.setAttribute('style', 'list-style-type: none');

    result.data.workers.forEach((w, idx) => {
      const li = document.createElement('li');
      li.setAttribute('id', w.id);
      li.innerHTML += `${idx + 1} : ${
        w.name
      }<button type="button" class="btn btn-close" />`;
      ul.appendChild(li);
    });
    memberDiv.appendChild(ul);
    cardBody.appendChild(memberDiv);
  }
});

async function updateCard() {
  const titleInput =
    document.getElementById('titleInput').value === ''
      ? undefined
      : document.getElementById('titleInput').value;
  const descriptionInput =
    document.getElementById('descriptionInput').value === ''
      ? undefined
      : document.getElementById('descriptionInput').value;
  const deadlineInput =
    document.getElementById('deadlineInput').value === ''
      ? undefined
      : document.getElementById('deadlineInput').value;

  if (!titleInput && !descriptionInput && !deadlineInput) {
    alert('변경할 데이터가 없습니다.');
  } else {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        title: titleInput,
        description: descriptionInput,
        deadline: deadlineInput,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(`http://localhost:8080/cards/${id}`, options);
    window.location.reload();
  }
}

async function updateCardColor() {
  const colorInput = document.getElementById('colorInput').value;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ color: colorInput }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const result = await fetch(`http://localhost:8080/cards/${id}`, options);
  window.location.reload();
}
async function updateCardMember() {
  const memberInput =
    document.getElementById('memberInput').value === ''
      ? undefined
      : document.getElementById('memberInput').value;
  if (!memberInput) {
    alert('추가할 멤버의 이메일을 입력해주세요.');
  } else {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ userEmail: memberInput }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await fetch(
      `http://localhost:8080/cards/${id}`,
      options,
    ).catch((e) => {
      return e;
    });
    window.location.reload();
  }
}

async function createCommentForCard() {
  const comment = document.getElementById('comment');

  const obj = {};
  obj.comment = comment.value;

  const options = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie(),
    },
  };

  await fetch(`http://localhost:8080/comments/${id}`, options)
    .then((data) => data.json())
    .catch((e) => {
      console.log(e);
    });

  window.location.reload();
}

async function deleteComment(tag) {
  const commentId = tag.getAttribute('id');

  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie(),
    },
  };

  await fetch(`http://localhost:8080/comments/${commentId}`, options);

  window.location.reload();
}

function logout() {
  try {
    document.cookie =
      'Authorization=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;';
    alert('사용자 인증 해제 성공');
    window.location.href = 'http://127.0.0.1:5500/front-end/public/index.html';
  } catch {
    alert('사용자 인증 해제 실패');
  }
}

function getCookie() {
  const cookie = decodeURIComponent(document.cookie);
  const token = cookie.split('=')[1];
  return token;
}
