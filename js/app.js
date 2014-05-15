App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create({
      name: "Pat"
    });
  }
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openModal: function(template, model) {
      var controller = this.controllerFor(template);
      controller.set('model', model);
      return this.render(template, {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

App.ModalView = Ember.View.extend({
  templateName: 'modal',

  didInsertElement: function() {
    $("#myModal").modal("show");
  },

  willDestroyElement: function() {
    $("#myModal").on("hide.bs.modal", function(e) {
      $("div.modal-backdrop").fadeOut(300, function() {
        this.remove();
      });
    }).modal("hide");
  }
});

App.ModalController = Ember.ObjectController.extend({

  actions: {
    close: function() {
      return this.send('closeModal');
    },

    save: function() {
      return this.send('closeModal');
    }

  }
});

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      // Will look for `close` action on App.ModalController
      return this.sendAction();
    },

    save: function() {
      // Will look for `save` action on App.ModalController
      return this.sendAction('save');
    }
  }
});
