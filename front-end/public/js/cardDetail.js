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
    <h3 style="color:coral">Members</h3>
    `;
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'workers');
    ul.setAttribute('style', 'list-style-type: none');

    result.data.workers.forEach((w, idx) => {
      const li = document.createElement('li');
      li.setAttribute('id', w.id);
      li.innerHTML += `${idx + 1} : ${w.name}`;
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
    console.log(result);
  }
}

async function createCommentForCard() {
  const comment = document.getElementById('comment');

  const obj = {};

  obj.comment = comment.value;

  const options = {
    method: 'POST',
    credential: 'includes',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const result = await fetch(
    `http://localhost:8080/comments/${id}`,
    options,
  ).then((data) => data.json());

  window.location.reload();
}

async function deleteComment(tag) {
  const commentId = tag.getAttribute('id');

  const options = {
    method: 'DELETE',
    credential: 'includes',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  await fetch(`http://localhost:8080/comments/${commentId}`, options);

  window.location.reload();
}
