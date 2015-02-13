var posts = [
  {
    status: "This is a status",
    likes: 5,
    likedByMe: false,
    id: 0,
    comments: [{
      comment: "hello world",
      id: 0
    }]
  },
  {
    status: "This is another status",
    likes: 8,
    likedByMe: true,
    id: 1,
    comments: []
  }
];

function onLoad(){
  clearPosts();

  var temp = [].concat(posts).reverse();

  temp.forEach(function(post){
    if(shortText){
      if(post.status.length > 47){
        var tempPost = new Post(post.status.substring(0,47)+'...');
        tempPost.id = post.id;  
        displayPost(tempPost);
      }
      else{
        displayPost(post);
      }
      post.comments.forEach(function(comment){
        displayComment(post.id, comment);
      });
    }
    else{
      displayPost(post);
      post.comments.forEach(function(comment){
        displayComment(post.id, comment);
      });
    }
  });

}

function createPost(post){
  if(post != ''){
    posts.push(new Post(post));
  }
  onLoad();
  
}

var likePost = function(postId) {
  posts.forEach(function(post){
    if(post.id === postId){
      if(post.likedByMe){
        post.likes--;
      }
      else{
        post.likes++;
      }
      post.likedByMe = !post.likedByMe;
    }
  });

  onLoad();
};

var addComment = function(postId, comment) {
  posts.forEach(function(post){
    if(post.id === postId)
      post.comments.push(new Comment(postId, comment));
  });
  
  onLoad();
}

var shortText = false;

function toggleShortText(){
  shortText = !shortText;

  onLoad();
}

function Post(post){
  this.status = post;
  this.likes = 0;
  this.likedByMe = false;
  this.id = posts.length;
  this.comments = [];
}

function Comment(postId, comment){
  this.comment = comment;
  this.id = postId;
}


