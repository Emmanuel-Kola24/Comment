let comments = [
    {
        id: 1,
        text: "",
        replies: []
    }
];

// Function to render comments and replies
function renderComments(comments){
    if(!comments || comments.length === 0){
        return `<p>No comments</p>`;
    }
    let html = '<ul>';
    comments.forEach(comment => {
        html += `
        <li>
            <p>${comment.text}</p>
            ${renderComments(comment.replies)}
        </li>
        `;
    });
    html += '</ul>';
    return html;
}

// Event listener for the "Comment" button
document.getElementById('comment1').addEventListener('click', function() {
    const commentInput = document.getElementById('comment').value;

    if(commentInput) {
        comments.push({
            id: comments.length + 1,
            text: commentInput,
            replies: []
        });

        // Clear input field after submission
        document.getElementById('comment').value = '';

        // Render updated comments
        const Comment = document.getElementById('nested-comment')
        Comment.innerHTML = renderComments(comments);
    }
});

// Event listener for the "Reply" button
document.getElementById('comment3').addEventListener('click', function() {
    const replyInput = document.getElementById('comment2').value;

    if(replyInput && comments.length > 0) {
        comments[comments.length - 1].replies.push({
            id: comments[comments.length - 1].replies.length + 1,
            text: replyInput,
            replies: []
        });

        // Clear input field after submission
        document.getElementById('comment2').value = '';

        // Render updated comments
        const Comment = document.getElementById('nested-comment')
        Comment.innerHTML = renderComments(comments);
    }
});

// Initial rendering of comments
const Comment = document.getElementById('nested-comment')
Comment.innerHTML = renderComments(comments);
