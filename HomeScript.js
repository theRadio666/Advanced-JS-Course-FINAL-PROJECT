
let currentPage = 1
let lastPage = 1;


// ===== INFINITE SCROLL =====//
  window.addEventListener("scroll", function()
{
 

  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  
    console.log(window.innerHeight)

    console.log(endOfPage,window.pageYOffset,document.body.offsetHeight,document.body.scrollHeight)

  if(endOfPage && currentPage < lastPage)
    {
     
      currentPage = currentPage + 1
      getPosts(false, currentPage )
      
    }

    console.log(currentPage , lastPage)


})
// =====// INFINITE SCROLL //=====//




setupUI()

getPosts()

function getPosts(reload = true, page = 1)
{

  console.log(page)

toggleloader(true)
axios.get(`${baseUrl}/posts?limit=6&page=${page}`)
.then((response) => {

  toggleloader(false)

console.log(response)

const posts = response.data.data

lastPage = response.data.meta.last_page


// console.log(lastPage)

console.log(posts)

if(reload)
  {
    document.getElementById("posts").innerHTML =""
  }



for(post of posts)
{
console.log(post)

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
                            <div class="card-header" >
                              <span onclick="UserClicked(${post.id})">
                                 <img src="${author.profile_image}" alt="" style="width: 40px; height: 40px;" class="rounded-circle border border-2">
                                <b>${author.username}</b>
                              </span>
                               ${editBtnContent}
                            </div>
                            <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer; ">
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

document.getElementById("posts").innerHTML += content



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



// function registerBtnClicked()
// {
//   console.log("hekko")

//   let name = document.getElementById("register-name-input").value
//   let passsword = document.getElementById("register-passwerd-input").value
//   let username = document.getElementById("register-username-input").value

//   console.log(name,username,passsword)


//   let title = document.getElementById("post-title-input").value
//   let body = document.getElementById("post-body-input").value
//   let image = document.getElementById("register-image-input").files[0]



//   let formData = new FormData()
//   formData.append("name",name)
//   formData.append("username",username)
//   formData.append("password",passsword)
//   formData.append("image",image)


//   const url = `${baseUrl}/register`
//   axios.post(url,formData,{
//     headers: {
//        "Content-Type":"multipart/form-data",
//     }
//   })
//   .then((response) => {


//     localStorage.setItem("user",JSON.stringify(response.data.user))


//     console.log(passswerd,username)

//       showSuccessAlert("New User Registered seccessifuly")
    


//     console.log(response.data)

//     const modal = document.getElementById("register-modal")
//     const modalInstance = bootstrap.Modal.getInstance(modal)
//     modalInstance.hide()
  


//     setupUI()


//   })
//   .catch((error) => {
//     const message = error.response
  
//     console.log(message)

//     showErrorAlert(message)
  
//   })

//   loginBtnClicked()

//   setupUI()

// }


function postClicked(postID)
{
// alert(postID)
window.location = `postDetails.html?postId=${postID}`
}



function UserClicked(userID)
{
  // alert(userID)

  window.location = `profile.html?userId=${userID}`
 



}
