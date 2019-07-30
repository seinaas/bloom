Accounts.onCreateUser(function(options, user) {
  var picture;
  //if user is logged in with third-party service, use profile picture from service, otherwise use random image (TO FIX)
  if (typeof user.services.google !== "undefined") {
    picture = user.services.google.picture;
  } else if (typeof user.services.facebook !== "undefined") {
    picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large"
  } else {
    picture = "https://picsum.photos/60/60";
  }
  
  //add servers and display_picture element to new users in collection
    const customUser = Object.assign({
      servers: new Array(),    
      display_picture: picture,
    }, user)

    if (options.profile) {
      customUser.profile = options.profile;
    }
    return customUser;
});
