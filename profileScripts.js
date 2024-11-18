setupUI()
getUser()
getPosts()

toggleloader(false)

function getCurrentUserId()
{
  const urlParmas = new URLSearchParams(window.location.search)
  const id = urlParmas.get("userId")
  return id
}

function getUser()
{
    let id = getCurrentUserId()


    // alert(id)
    

    axios.get(`${baseUrl}/users/${id}`)
    .then((response) => {
        console.log(response.data)
        const user = response.data.data
        document.getElementById("main-info-email").innerHTML = user.email
        document.getElementById("main-info-name").innerHTML = user.name
        document.getElementById("main-info-username").innerHTML = user.username
        document.getElementById("main-info-image").src = user.profile_image
        document.getElementById("name-posts").innerHTML = `${user.username}'s`
        
        // Posts $ comments count
        
        document.getElementById("posts-count").innerHTML = user.posts_count
        document.getElementById("comments-count").innerHTML = user.comments_count
    })
}



function getPosts()
{

  const id= getCurrentUserId()

  // alert(id)
  

  axios.get(`${baseUrl}/users/${id}/posts`)
  .then((response) => {

  const posts = response.data.data

  console.log(posts)

  document.getElementById("user-posts").innerHTML =""



  for(post of posts)
  {


  const author = post.author

  let  postTitle = ""

  // show or hide (edit) button

  let user = getCurrentUser()
  let isMyPost = user != null && post.author.id == user.id
  let editBtnContent = ``

  if(isMyPost)
  {
      editBtnContent = 
      `
      <button class='btn btn-danger' style="margin-left:5px; float: right;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>

       <button class='btn btn-secondary' style="float: right;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
       `
  }
  if(post.title != null)
  {
  postTitle = post.title
  }
  const tagsHtml = post.tags.map((tag) => `<span class="tag">${tag.arabic_name}</span>`).join("");

  let content = `
                            <!-- post -->
                            <div class=" card shadow">
                              <div class="card-header">
                                  <img src="${author.profile_image}" alt="" style="width: 40px; height: 40px;" class="rounded-circle border border-2">
                                  <b>${author.username}</b>

                                 ${editBtnContent}
                              </div>
                              <div class="card-body" onclick="postClicked(${post})" style="cursor: pointer; ">
                                  <img class="w-100" src="${post.image}" alt="">
                                  <h6 class="mt-1" style="color: rgba(128, 128, 128, 0.687);">
                                   ${post.created_at}
                                  </h6>

                                <h5>
                                  ${postTitle}
                                </h5>

                                <p>
                                  ${post.body}  
                                </p>

                                <hr>

                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                  </svg>
                                  <sapn>
                                    (${post.comments_count}) comments

                                    <span id="post-tags" onload={Ftags}>
                                      <div class="tags">${tagsHtml}</div>
                                    </span>  
                                  </sapn>
                                </div>
                              </div>
                        </div>
                      <!--// post //-->
  `

  document.getElementById("user-posts").innerHTML += content



  //  document.getElementById("post-tags").innerHTML = '<div></div>'

  // console.log(post.tags.name)

  // for(tag of post.tags)
  // {

  //  let TagsContent =
  //  `
  //   <button class="btn tbn-sm rounded-5" style="background : gray; color: white;">
  //    ${tag.name}
  //   </button>  
  //  `

  //  document.getElementById("post-tags").innerHTML += TagsContent
  // }



  }
  })


}
