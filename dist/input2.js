// let comments = [
//     {
//         id: 1,
//         text: "",
//         replies: []
//     }
// ];

// // Function to render comments and replies
// function renderComments(comments, parentCommentId = null){
//     if(!comments || comments.length === 0){
//         return `<p>No comments</p>`;
//     }
//     let html = '<ul>';
//     comments.forEach(comment => {
//         html += `
//         <li>
//             <p>${comment.text}</p>
//             <button class="reply-button" data-id="${comment.id}">Reply</button>
//             ${renderComments(comment.replies, comment.id)}
//         </li>
//         `;
//     });
//     html += '</ul>';
//     return html;
// }

// // Function to find a comment by ID and add a reply
// function addReplyToComment(comments, parentId, replyText){
//     for (let i = 0; i < comments.length; i++) {
//         if (comments[i].id === parentId) {
//             comments[i].replies.push({
//                 id: comments[i].replies.length + 1,
//                 text: replyText,
//                 replies: []
//             });
//             return true;
//         } else if (addReplyToComment(comments[i].replies, parentId, replyText)) {
//             return true;
//         }
//     }
//     return false;
// }

// // Event listener for the "Comment" button
// document.getElementById('comment1').addEventListener('click', function() {
//     const commentInput = document.getElementById('comment').value;

//     if(commentInput) {
//         comments.push({
//             id: comments.length + 1,
//             text: commentInput,
//             replies: []
//         });

//         // Clear input field after submission
//         document.getElementById('comment').value = '';

//         // Render updated comments
//         document.getElementById('nested-comment').innerHTML = renderComments(comments);
//     }
// });

// // Event listener for dynamically created "Reply" buttons
// document.getElementById('nested-comment').addEventListener('click', function(event) {
//     if (event.target.classList.contains('reply-button')) {
//         const parentId = parseInt(event.target.getAttribute('data-id'));
//         const replyInput = prompt('Type your reply:');
        
//         if (replyInput) {
//             addReplyToComment(comments, parentId, replyInput);

//             // Render updated comments
//             document.getElementById('nested-comment').innerHTML = renderComments(comments);
//         }
//     }
// });

// // Initial rendering of comments
// document.getElementById('nested-comment').innerHTML = renderComments(comments);



const Comment = document.getElementById('nested-comment')
Comment.innerHTML = renderComments(comments);









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
        document.getElementById('nested-comment').innerHTML = renderComments(comments);
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
        document.getElementById('nested-comment').innerHTML = renderComments(comments);
    }
});

// Initial rendering of comments
document.getElementById('nested-comment').innerHTML = renderComments(comments);
