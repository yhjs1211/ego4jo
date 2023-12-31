<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<hr>
<h1 align="center">ERD</h1>
<hr>
<p align="center">
<img width="766" alt="image" src="https://github.com/yhjs1211/ego4jo/assets/122883378/ca7925db-8260-4347-917f-d71c44f56d89">
</p>

<hr>
<h1 align="center">API</h1>
<hr>
<ul>
<li>
<h4>User</h4>
<ul>
<li>
<p>POST '/users' - sign-up</p>
</li>
<li>
<p>POST '/users/login' - log-in</p>
</li>
<li>
<p>GET '/users' - get current user</p>
</li>
<li>
<p>PATCH '/users' - update current user</p>
</li>
<li>
<p>DELETE '/users' - delete current user</p>
</li>
<li>
<p>POST '/users/image' - upload user profile image</p>
</li>
<li>
<p>GET '/users/image' - get user profile image</p>
</li>
</ul>
</li>
<li>
<h4>Card</h4>
<ul>
<li>
<p>GET '/cards/:id' - getCardDetailById</p>
</li>
<li>
<p>POST '/cards' - createCard</p>
</li>
<li>
<p>PUT '/cards/:id' - updateCard</p>
</li>
<li>
<p>DELETE '/cards/:id' - deleteCard</p>
</li>
</ul>
</li>
<li>
<h4>Comment</h4>
<ul>
    <li>
        <p>GET '/comments/:cardId' - getAllCommentsByCardId</p>
    </li>
    <li>
        <p>POST '/comments/:cardId' - createCommentByCardId</p>
    </li>
    <li>
        <p>PUT 'comments/:commentId' - updateCommentByCommentId</p>
    </li>
    <li>
        <p>DELETE 'comments/:commentId' -deleteCommentByCommentId</p>
    </li>
</ul>
</li>
<li>
<h4>Board</h4>
<ul>
<li>
<p>GET '/boards/createdBoards' - getCreatedBoards</p>
</li>
<li>
<p>POST '/boards' - createBoard</p>
</li>
<li>
<p>PUT '/boards/:boardId' - updateBoard</p>
</li>
<li>
<p>DELETE '/boards/:boardId' - deleteBoard</p>
</li>
<li>
<p>POST '/boards/invite/:boardId' - inviteUser</p>
</li>
<li>
<p>GET '/boards/invitedBoards' - getInvitedBoards</p>
</li>
<li>
<p>GET '/boards/detail/:id' - getBoardDetail</p>
</li>
<li>
<p>DELETE '/boards/invitedBoards/:boardId' - deleteInvitedBoard</p>
</li>
</ul>
</li>
<li>
<h4>Column</h4>
<ul>
<li>
<p>GET '/columns' - getColumns</p>
</li>
<li>
<p>GET '/columns/:id' - getColumnDetailById</p>
</li>
<li>
<p>POST '/columns' - createColumns</p>
</li>
<li>
<p>PUT '/columns/:id' - updateColumns</p>
</li>
<li>
<p>DELETE '/columns/:id' - deleteCard</p>
</li>
</ul>
</li>
</ul>
