Accounts.onCreateUser(function(options, user) {
    const customUser = Object.assign({
      servers: new Array(),
    }, user)

    if (options.profile) {
      customUser.profile = options.profile;
    }
    return customUser;
});