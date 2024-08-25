// Initial comments array
let comments = [
    // Example of a comment with replies
    // {
    //     id: 1,
    //     text: "This is an example comment.",
    //     replies: [
    //         {
    //             id: 1,
    //             text: "This is a reply to the example comment.",
    //             replies: []
    //         }
    //     ]
    // }
];

// Utility function to generate unique IDs
function generateId() {
    return Date.now();
}

// Function to render comments recursively
function renderComments(commentsList, parentElement) {
    commentsList.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('ml-4', 'border-l', 'pl-4', 'mb-4');

        const commentText = document.createElement('p');
        commentText.textContent = comment.text;
        commentText.classList.add('text-gray-800');

        const replyButton = document.createElement('button');
        replyButton.textContent = 'Reply';
        replyButton.classList.add('text-sm', 'text-blue-500', 'mt-2');
        replyButton.onclick = () => {
            document.getElementById('reply').focus();
            document.getElementById('reply').setAttribute('data-comment-id', comment.id);
        };

        commentDiv.appendChild(commentText);
        commentDiv.appendChild(replyButton);

        if (comment.replies && comment.replies.length > 0) {
            renderComments(comment.replies, commentDiv);
        }

        parentElement.appendChild(commentDiv);
    });
}

// Function to update the comments display
function updateCommentsDisplay() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';

    if (comments.length === 0) {
        const noCommentsText = document.createElement('p');
        noCommentsText.textContent = 'No comments yet. Be the first to comment!';
        noCommentsText.classList.add('text-gray-500');
        commentsContainer.appendChild(noCommentsText);
    } else {
        renderComments(comments, commentsContainer);
    }
}

// Event listener for adding a new comment
document.getElementById('addCommentBtn').addEventListener('click', () => {
    const commentInput = document.getElementById('comment');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const newComment = {
            id: generateId(),
            text: commentText,
            replies: []
        };
        comments.push(newComment);
        commentInput.value = '';
        updateCommentsDisplay();
    } else {
        alert('Please enter a comment before submitting.');
    }
});

// Event listener for adding a reply to a comment
document.getElementById('addReplyBtn').addEventListener('click', () => {
    const replyInput = document.getElementById('reply');
    const replyText = replyInput.value.trim();
    const parentCommentId = replyInput.getAttribute('data-comment-id');

    if (replyText !== '' && parentCommentId) {
        const addReply = (commentsList) => {
            for (let comment of commentsList) {
                if (comment.id == parentCommentId) {
                    const newReply = {
                        id: generateId(),
                        text: replyText,
                        replies: []
                    };
                    comment.replies.push(newReply);
                    return true;
                } else if (comment.replies.length > 0) {
                    const found = addReply(comment.replies);
                    if (found) return true;
                }
            }
            return false;
        };

        const replyAdded = addReply(comments);
        if (replyAdded) {
            replyInput.value = '';
            replyInput.removeAttribute('data-comment-id');
            updateCommentsDisplay();
        } else {
            alert('Failed to add reply. Please try again.');
        }
    } else {
        alert('Please select a comment to reply to and enter your reply.');
    }
});

// Initial display update
updateCommentsDisplay();
