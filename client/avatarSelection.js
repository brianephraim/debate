setTemplateEvents('avatarSelection',{
    "click img": function (e, tmpl, x) {
      var debateId = this.dataItem._id;
      var $el = $(e.target);
      var self = this;
      var newProperty = {};
      newProperty['profile.avatar'+debateId] = $el.attr('src');
      Meteor.users.update({_id:Meteor.user()._id}, {$set:newProperty})
    }
})