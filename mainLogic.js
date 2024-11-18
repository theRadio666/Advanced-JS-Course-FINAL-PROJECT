
  const baseUrl = "http://tarmeezacademy.com/api/v1"







function setupUI()
{
  const token = localStorage.getItem("token")
    const commenter = document.getElementById("comment-input")
 const loginDiv = document.getElementById("logged-in-div")
 const logoutDiv = document.getElementById("logout-div")

//  add-btn

const addBtn = document.getElementById("add-btn")

  if(token == null)
  {
    if(addBtn != null)
    {
        addBtn.style.setProperty("display","none","important")
    }
    // commenter.style.setProperty("visibility","hidden","important")
    loginDiv.style.setProperty("display","flex","important")
    logoutDiv.style.setProperty("display","none","important")
  }else{ // for login user

    if(addBtn != null)
    {
        addBtn.style.setProperty("display","block","important")
    }

    // commenter.style.setProperty("visibility","visible","important")
    loginDiv.style.setProperty("display","none","important")
    logoutDiv.style.setProperty("display","flex","important")


      let user = getCurrentUser()

    document.getElementById("nav-username").innerHTML = user.username
    document.getElementById("nav-user-image").src = user.profile_image
  }




}


// ========== AUTH FUNCTION ==========


function toggleloader(show = true)
{
  if(show)
  {
    document.getElementById("loader").style.visibility = "visible"
  }else{
    document.getElementById("loader").style.visibility = "hidden"
  }
}

function loginBtnClicked()
{

  let passswerd = document.getElementById("passwerd-input").value
  let username = document.getElementById("username-input").value

  const params = {
    "username" : username,
    "password" : passswerd
  }

  let url = `${baseUrl}/login`
  toggleloader(true)
  axios.post(url,params)
  .then((response) => {
    
    console.log(response.data.token)


    localStorage.setItem("user",JSON.stringify(response.data.user))
    localStorage.setItem("token",response.data.token)


    console.log(passswerd,username)

      const modal = document.getElementById("login-modal")
      const modalInstance = bootstrap.Modal.getInstance(modal)
      modalInstance.hide()

      showSuccessAlert("Login is done seccessifuly")
      setupUI()
  }).catch((error) => {
    const M = error.response.data.message
    showErrorAlert(M)
  }).finally(() => {
    toggleloader(false)
  })

//  showSuccessAlert()

}

function registerBtnClicked()
{
  let name = document.getElementById("register-name-input").value
  let passsword = document.getElementById("register-passwerd-input").value
  let username = document.getElementById("register-username-input").value
  let image = document.getElementById("register-image-input").files[0]

  console.log(name,username,passsword)


  let formData = new FormData()
  formData.append("name",name)
  formData.append("username",username)
  formData.append("password",passsword)
  formData.append("image",image)
  


  let url = `${baseUrl}/register`

  toggleloader(true)

  axios.post(url,formData,{
    headers: {
       "Content-Type":"multipart/form-data",
    }
  })

  .then((response) => {


  localStorage.setItem("user",JSON.stringify(response.data.user))


//   console.log(passswerd,username)

    showSuccessAlert("New User Registered seccessifuly")
    


  console.log(response.data)

  const modal = document.getElementById("register-modal")
      const moodalInstance = bootstrap.Modal.getInstance(modal)
      moodalInstance.hide()



  setupUI()


  }).catch((error) => {
       const M = error.response.data.message

     

      showErrorAlert(M)

    }).finally(() => {
      toggleloader(false)
    })


  loginBtnClicked()

  setupUI()


}
function logout()
{
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  showSuccessAlert("Logout is done seccessifuly!")
  setupUI()


}

function showErrorAlert(M)
{
  let seccessbtn = document.getElementById("error-alert")

  console.log(M)


  // const alertPlaceholder = document.getElementById('success-alert')

  // const alert = (message , type) => {

  //   const wrapper = document.createElement('div')

  //   wrapper.innerHTML = [
  //     `<div class="alert alert-${type} alert-dismissible" role="alert" >`,
  //       `<div>${message}<div>`,
  //         '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close></button>" ',
  //         '</div>'
  //   ].join('')

  //   alertPlaceholder.append(wrapper)

  // }


  
  // alert('Nice , you triggerd this alert message ','succes')













    seccessbtn.style.visibility = "visible"


     seccessbtn.innerHTML = `${M}`;

    //ToDo : hide the alert

    setTimeout(() => {

      seccessbtn.style.visibility= "hidden"

      // const alertToHide = bootstrap.Alert.getOrCreateInstance('#error-alert')
      // alertToHide.dispose()
    },2000)

  //  setTimeout(() => {

  //   seccessbtn.style.visibility = "hidden"


  //  },4000)

   



}


// showSuccessAlert()

function showSuccessAlert(M)
{
  let seccessbtn = document.getElementById("success-alert")

  console.log(M)


  // const alertPlaceholder = document.getElementById('success-alert')

  // const alert = (message , type) => {

  //   const wrapper = document.createElement('div')

  //   wrapper.innerHTML = [
  //     `<div class="alert alert-${type} alert-dismissible" role="alert" >`,
  //       `<div>${message}<div>`,
  //         '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close></button>" ',
  //         '</div>'
  //   ].join('')

  //   alertPlaceholder.append(wrapper)

  // }


  
  // alert('Nice , you triggerd this alert message ','succes')













    seccessbtn.style.visibility = "visible"


     seccessbtn.innerHTML = `${M}`;

    //ToDo : hide the alert

    setTimeout(() => {

      seccessbtn.style.visibility = "hidden"
    },2000)

  //  setTimeout(() => {

  //   seccessbtn.style.visibility = "hidden"


  //  },4000)

   



}

function getCurrentUser()
{
  let user = null
  const storageUser = localStorage.getItem("user")


  if(storageUser != null)
{
  user = JSON.parse(storageUser)
}

return user


}

function editPostBtnClicked(postObject)
{

let post = JSON.parse(decodeURIComponent(postObject))

document.getElementById("post-modal-submit-btn").innerHTML = "Update"

document.getElementById("post-id-input").value= post.id
document.getElementById("post-modal-title").innerHTML = "Edit Post"

document.getElementById("post-title-input").value = post.title
document.getElementById("post-body-input").value = post.body

let postModal = new bootstrap.Modal(document.getElementById("create-post-modal") , {})
postModal.toggle()
}


function addBtnClicked()
{

document.getElementById("post-modal-submit-btn").innerHTML = "Create"
document.getElementById("post-id-input").value= ""
document.getElementById("post-modal-title").innerHTML = "Create Post"
document.getElementById("post-title-input").value = ""
document.getElementById("post-body-input").value = ""

let postModal = new bootstrap.Modal(document.getElementById("create-post-modal") , {})
postModal.toggle()
}

function deletePostBtnClicked(postObject)
{
  let post = JSON.parse(decodeURIComponent(postObject))
  console.log(post)

 document.getElementById("delete-post-id-input").value = post.id



  let postModal = new bootstrap.Modal(document.getElementById("delete-post-modal") , {})
  postModal.toggle() 


}

function confirmPostDelete()
{

  const token = localStorage.getItem("token")
  const postId = document.getElementById("delete-post-id-input").value
  const url = `${baseUrl}/posts/${postId}`
  const headers = {
    "Content-Type": "multipart/form-data",
    "authorization": `Bearer ${token}`
  }



  axios.delete(url, {
    headers: headers
  })
  .then((response) => {
    console.log(response)

    const modal = document.getElementById("delete-post-modal")
    const modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    showSuccessAlert("The post Has Been Deleted Successfuly!")
  
    getPosts()
  }).catch((error) => {
    const message = error.response.data.message

    showErrorAlert(message)
  })
}

function profileClicked()
{
  const user = getCurrentUser()
  const userId = user.id
  
   window.location = `profile.html?userId=${userId}`
}

function createNewPostClicked()
{
// console.log("AAABBB")

let postId = document.getElementById("post-id-input").value
let isCreate= postId == null || postId == ""



let title = document.getElementById("post-title-input").value
let body = document.getElementById("post-body-input").value
let image = document.getElementById("post-image-input").files[0]
const token = localStorage.getItem("token")


let formData = new FormData()
formData.append("body",body)
formData.append("title",title)
formData.append("image",image)

// const params = {
//   "title" : title,
//   "body" : body
// }




let url = ``

const headers = {
  "Content-Type": "multipart/form-data",
  "authorization": `Bearer ${token}`
}

if(isCreate)
{
    url = `${baseUrl}/posts`
      
}else{
    formData.append("_method","put")
    url = `${baseUrl}/posts/${postId}`

}
toggleloader(true)

axios.post(url,formData,{
    headers:headers
  })
  .then((response) => {
    const modal = document.getElementById("create-post-modal")
    const modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    showSuccessAlert("New Post Has Been Created")
  
    getPosts()
  
  }).catch((error) => {
    const message = error.response.data.message
    showErrorAlert(message)
  }).finally(() => {
    toggleloader(false)
  })





}