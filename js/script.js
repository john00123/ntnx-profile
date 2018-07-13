const popupData ={
  title :[
    'Multifactor Authentication',
    'Account Information',
    'Profile Information',
    'Change Password',
    'Setup Active Directory',
    'Active Directory Options',
    'Group Roles'
  ],

  body: [
    `
    <div class='dot-parent'>
    </div>
    <h3 style='margin-bottom:5px'>Improve your account security with a 2 step verification process</h3>

    <p>Each time you sign in you'll need your password and a verification code sent directly to a phone.</p>`,

    `<label for="other">Company Name</label>
    <input type="text" value='Nutanix Corporate' id='old-pswd'>
    <label for="other">Address</label>
    <input type="Address" value='1740 Technology Drive, San Jose CA' id='new-pswd'>`,

    `<label for="other">Name</label>
    <input type="text" value='Istrator Admin' id='old-pswd'>
    <label for="other">Email</label>
    <input type="email" value='administrator@nutanix.com' id='new-pswd'>`,

    `<label for="other">Previous Password</label>
    <input type="password" id='old-pswd'>
    <label for="other">New Password</label>
    <div class='upload-file' style='margin-bottom:20px'>
      <input class='path' type='password' id='new-pswd'></input>
      <label class='file-button' for='file' id='show-pswd'>Show</label>
    </div>
    <label for="other">Retype new password</label>
    <input type="password" id='retype'>`,

    `<h3>Enable ADFS by uploading <code>FederationMetadata.xml</code> file.</h3>\
    <input type="file" id='file' >
    <label for='path2'>Select file</label>
    <div class='upload-file'>
    <input class='path' readonly type='text' id='path2'></input>
    <label class='file-button' for='file'>Select File</label>
    </div>
    `,

    `<h3 style='margin-bottom:5px'><input type="checkbox" checked="checked"> &nbsp;Federated Authentication</h3>
    <p>Allows login with you company Active Directory credentials</p>
    <div class='separator'></div>
    <h3 style='margin-bottom:5px'>Remove ADFS</h3>
    <p>Remove AD for this account, this will render all access for the AD users and groups invalid type 'DELETE' to proceed.</p>
    <div class='upload-file' style='margin-top:20px;'>
      <input class='path' type='text'></input>
      <button class="primary delete">Remove</button>
    </div>
    `,

    //mapping
    `
    <h3>Assign <code>Comma-separated</code> groups to their access tiers.</h3>
    <div class='upload-file top-aligned'>
      <div class='pair selectized' style='margin-right:10px;'>
        <label for="input-tags">Xi Admin</label>
        <input type='text' id='input-tags'>

      </div>
      <div class='pair selectized' style='margin-right:10px;'>
        <label for="input-tags2">Xi User</label>
        <input type='text' id='input-tags2'>

      </div>
    </div>
    `,
  ],

  footer:[
    `<button class="primary save">Enable</button>`,
    `<button class="primary save">Save</button>`,
    `<button class="primary save">Save</button>`,
    `<button class="primary save">Save</button>`,
    `<button class="primary upload">Upload</button>`,
    ``,
    `<button class="primary back">Assign</button>`
  ]
}

function popAnimate(){
  $('.overlay').addClass('show');
  $('html').css('overflow','hidden');
  setTimeout(function(){
    $('.popup').addClass('appear');
  },200);

  $('.popup-header:not(.popup-header2), .save').click(function(){
      $('.popup').addClass('disappear');
      $('.overlay').addClass('peek');
      $('.overlay').removeClass('show');
      $('html').css('overflow','');
      setTimeout(function(){
        $('.overlay').remove();
      },400);
    }
  );
}

function pswChange(){
  $('#new-pswd').clone().attr('type','tel').insertAfter('#new-pswd').prev().remove();
}

function pswChange2(){
  $('#new-pswd').clone().attr('type','password').insertAfter('#new-pswd').prev().remove();
}

function popupContent(i){
  $('body').append(
    `<div class="overlay" style='opacity:0'>
      <div class="popup" style='opacity:0'>
        <div class="popup-header">${popupData.title[i]}</div>
        <div class="popup-body">${popupData.body[i]}</div>
        <div class="popup-footer">${popupData.footer[i]}</div>
      </div>
    </div>`
  );
  $('.file-button').click(function(){

    if($('.file-button').text() === 'Show'){
      pswChange();
      $('.file-button').text('Hide');
    } else{
      pswChange2();
      $('.file-button').text('Show');
    }

  }
  );

  popAnimate();
  $('.upload').click(function(){
    $('.popup').css('animation','layer 600ms forwards');
    $('.popup').addClass('second');
    layer2(6);
  });

}

function layer2(i){
  $('body').append(
    `<div class="overlay overlay2" style='background-color:transparent'>
      <div class="popup layer2" style='opacity:0'>
        <div class="popup-header popup-header2">${popupData.title[i]}</div>
        <div class="popup-body">${popupData.body[i]}</div>
        <div class="popup-footer">${popupData.footer[i]}</div>
      </div>
    </div>`
  );
  popAnimate();
  $('.back, .popup-header2').click(function(){
    $('.layer2').addClass('disappear');
    $('.popup:not(.layer2)').css('animation','reverse-layer 600ms forwards');
    $('.popup:not(.layer2)').removeClass('second');
    $('.layer2, .overlay2').remove();
  });
  $('#input-tags, #input-tags2').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
        return {
            value: input,
            text: input
        }
      }
  });
}

function uploadPath(){
  let one = $(this).val().replace("C:\\fakepath\\",'');
  $('.path').val(one);
}

$(document).ready(function() {
  $('.AD .card-title a').click(function(){popupContent(5)});
  $('.adfs').click(function(){popupContent(4)
    $("input[type='file']").change(uploadPath);
  });
  $('.chng-pswd').click(function(){popupContent(3)});
  $('.profile .card-title a').click(function(){popupContent(2)});
  $('.account .card-title a').click(function(){popupContent(1)});
  $('.enable-mult-auth').click(function(){popupContent(0)});
});
