const id = new URL(document.location.href).searchParams.get('id'); // cardId
const cardTitle = document.getElementById('card-title');
const cardDescription = document.getElementById('card-description');
const cardDeadline = document.getElementById('card-deadline');
const cardColor = document.getElementById('card-color');
const commentBox = document.getElementById('comment-box');

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
  cardColor.innerHTML = 'Color : ' + result.data.color;
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
});

async function updateCard() {
  const colorInput = document.getElementById('colorInput').value;
  const deadlineInput =
    document.getElementById('deadlineInput').value === ''
      ? null
      : document.getElementById('deadlineInput').value;
  console.log(deadlineInput);
  console.log(colorInput);
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
