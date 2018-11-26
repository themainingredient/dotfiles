(function() {
  var CompositeDisposable, RSpecView, url;

  RSpecView = require('./rspec-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  url = require('url');

  module.exports = {
    config: {
      command: {
        type: 'string',
        "default": 'rspec'
      },
      spec_directory: {
        type: 'string',
        "default": 'spec'
      },
      save_before_run: {
        type: 'boolean',
        "default": false
      },
      force_colored_results: {
        type: 'boolean',
        "default": true
      },
      split: {
        type: 'string',
        "default": 'right',
        description: 'The direction in which to split the pane when launching rspec',
        "enum": [
          {
            value: 'right',
            description: 'Right'
          }, {
            value: 'left',
            description: 'Left'
          }, {
            value: 'up',
            description: 'Up'
          }, {
            value: 'down',
            description: 'Down'
          }
        ]
      }
    },
    rspecView: null,
    subscriptions: null,
    activate: function(state) {
      if (state != null) {
        this.lastFile = state.lastFile;
        this.lastLine = state.lastLine;
      }
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'rspec:run': (function(_this) {
          return function() {
            return _this.run();
          };
        })(this),
        'rspec:run-for-line': (function(_this) {
          return function() {
            return _this.runForLine();
          };
        })(this),
        'rspec:run-last': (function(_this) {
          return function() {
            return _this.runLast();
          };
        })(this),
        'rspec:run-all': (function(_this) {
          return function() {
            return _this.runAll();
          };
        })(this)
      }));
      return atom.workspace.addOpener(function(uriToOpen) {
        var pathname, protocol, ref;
        ref = url.parse(uriToOpen), protocol = ref.protocol, pathname = ref.pathname;
        if (protocol !== 'rspec-output:') {
          return;
        }
        return new RSpecView(pathname);
      });
    },
    deactivate: function() {
      this.rspecView.destroy();
      return this.subscriptions.dispose();
    },
    serialize: function() {
      if (this.rspecView) {
        ({
          rspecViewState: this.rspecView.serialize()
        });
      }
      return {
        lastFile: this.lastFile,
        lastLine: this.lastLine
      };
    },
    openUriFor: function(file, lineNumber) {
      var previousActivePane, uri;
      this.lastFile = file;
      this.lastLine = lineNumber;
      previousActivePane = atom.workspace.getActivePane();
      uri = "rspec-output://" + file;
      return atom.workspace.open(uri, {
        split: atom.config.get("rspec.split"),
        activatePane: false,
        searchAllPanes: true
      }).then(function(rspecView) {
        if (rspecView instanceof RSpecView) {
          rspecView.run(lineNumber);
          return previousActivePane.activate();
        }
      });
    },
    runForLine: function() {
      var cursor, editor, line;
      console.log("Starting runForLine...");
      editor = atom.workspace.getActiveTextEditor();
      console.log("Editor", editor);
      if (editor == null) {
        return;
      }
      cursor = editor.getLastCursor();
      console.log("Cursor", cursor);
      line = cursor.getBufferRow() + 1;
      console.log("Line", line);
      return this.openUriFor(editor.getPath(), line);
    },
    runLast: function() {
      if (this.lastFile == null) {
        return;
      }
      return this.openUriFor(this.lastFile, this.lastLine);
    },
    run: function() {
      var editor;
      console.log("RUN");
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      return this.openUriFor(editor.getPath());
    },
    runAll: function() {
      var project;
      project = atom.project;
      if (project == null) {
        return;
      }
      return this.openUriFor(project.getPaths()[0] + "/" + atom.config.get("rspec.spec_directory"), this.lastLine);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL211bmtpdXMvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9yc3BlYy9saWIvcnNwZWMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVI7O0VBQ1gsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVI7O0VBRU4sTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLE1BQUEsRUFDRTtNQUFBLE9BQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxRQUFOO1FBQ0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxPQURUO09BREY7TUFHQSxjQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLENBQUEsT0FBQSxDQUFBLEVBQVMsTUFEVDtPQUpGO01BTUEsZUFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFNBQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBRFQ7T0FQRjtNQVNBLHFCQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sU0FBTjtRQUNBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFEVDtPQVZGO01BWUEsS0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLE9BRFQ7UUFFQSxXQUFBLEVBQWEsK0RBRmI7UUFHQSxDQUFBLElBQUEsQ0FBQSxFQUFNO1VBQ0o7WUFBQyxLQUFBLEVBQU8sT0FBUjtZQUFpQixXQUFBLEVBQWEsT0FBOUI7V0FESSxFQUVKO1lBQUMsS0FBQSxFQUFPLE1BQVI7WUFBZ0IsV0FBQSxFQUFhLE1BQTdCO1dBRkksRUFHSjtZQUFDLEtBQUEsRUFBTyxJQUFSO1lBQWMsV0FBQSxFQUFhLElBQTNCO1dBSEksRUFJSjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLFdBQUEsRUFBYSxNQUE3QjtXQUpJO1NBSE47T0Fi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ZXF1aXJlICcuL3JzcGVjLXZpZXcnXG57Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xudXJsID0gcmVxdWlyZSAndXJsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGNvbmZpZzpcbiAgICBjb21tYW5kOlxuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgIGRlZmF1bHQ6ICdyc3BlYydcbiAgICBzcGVjX2RpcmVjdG9yeTpcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICBkZWZhdWx0OiAnc3BlYydcbiAgICBzYXZlX2JlZm9yZV9ydW46XG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgZm9yY2VfY29sb3JlZF9yZXN1bHRzOlxuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgc3BsaXQ6XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgZGVmYXVsdDogJ3JpZ2h0J1xuICAgICAgZGVzY3JpcHRpb246ICdUaGUgZGlyZWN0aW9uIGluIHdoaWNoIHRvIHNwbGl0IHRoZSBwYW5lIHdoZW4gbGF1bmNoaW5nIHJzcGVjJ1xuICAgICAgZW51bTogW1xuICAgICAgICB7dmFsdWU6ICdyaWdodCcsIGRlc2NyaXB0aW9uOiAnUmlnaHQnfVxuICAgICAgICB7dmFsdWU6ICdsZWZ0JywgZGVzY3JpcHRpb246ICdMZWZ0J31cbiAgICAgICAge3ZhbHVlOiAndXAnLCBkZXNjcmlwdGlvbjogJ1VwJ31cbiAgICAgICAge3ZhbHVlOiAnZG93bicsIGRlc2NyaXB0aW9uOiAnRG93bid9XG4gICAgICBdXG5cblxuICByc3BlY1ZpZXc6IG51bGxcbiAgc3Vic2NyaXB0aW9uczogbnVsbFxuXG4gIGFjdGl2YXRlOiAoc3RhdGUpIC0+XG4gICAgaWYgc3RhdGU/XG4gICAgICBAbGFzdEZpbGUgPSBzdGF0ZS5sYXN0RmlsZVxuICAgICAgQGxhc3RMaW5lID0gc3RhdGUubGFzdExpbmVcblxuICAgIEBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGVcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS13b3Jrc3BhY2UnLFxuICAgICAgJ3JzcGVjOnJ1bic6ID0+XG4gICAgICAgIEBydW4oKVxuXG4gICAgICAncnNwZWM6cnVuLWZvci1saW5lJzogPT5cbiAgICAgICAgQHJ1bkZvckxpbmUoKVxuXG4gICAgICAncnNwZWM6cnVuLWxhc3QnOiA9PlxuICAgICAgICBAcnVuTGFzdCgpXG5cbiAgICAgICdyc3BlYzpydW4tYWxsJzogPT5cbiAgICAgICAgQHJ1bkFsbCgpXG5cbiAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIgKHVyaVRvT3BlbikgLT5cbiAgICAgIHtwcm90b2NvbCwgcGF0aG5hbWV9ID0gdXJsLnBhcnNlKHVyaVRvT3BlbilcbiAgICAgIHJldHVybiB1bmxlc3MgcHJvdG9jb2wgaXMgJ3JzcGVjLW91dHB1dDonXG4gICAgICBuZXcgUlNwZWNWaWV3KHBhdGhuYW1lKVxuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHJzcGVjVmlldy5kZXN0cm95KClcbiAgICBAc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcblxuICBzZXJpYWxpemU6IC0+XG4gICAgaWYgQHJzcGVjVmlld1xuICAgICAgcnNwZWNWaWV3U3RhdGU6IEByc3BlY1ZpZXcuc2VyaWFsaXplKClcbiAgICBsYXN0RmlsZTogQGxhc3RGaWxlXG4gICAgbGFzdExpbmU6IEBsYXN0TGluZVxuXG4gIG9wZW5VcmlGb3I6IChmaWxlLCBsaW5lTnVtYmVyKSAtPlxuICAgIEBsYXN0RmlsZSA9IGZpbGVcbiAgICBAbGFzdExpbmUgPSBsaW5lTnVtYmVyXG5cbiAgICBwcmV2aW91c0FjdGl2ZVBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKClcbiAgICB1cmkgPSBcInJzcGVjLW91dHB1dDovLyN7ZmlsZX1cIlxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4odXJpLCBzcGxpdDogYXRvbS5jb25maWcuZ2V0KFwicnNwZWMuc3BsaXRcIiksIGFjdGl2YXRlUGFuZTogZmFsc2UsIHNlYXJjaEFsbFBhbmVzOiB0cnVlKS50aGVuIChyc3BlY1ZpZXcpIC0+XG4gICAgICBpZiByc3BlY1ZpZXcgaW5zdGFuY2VvZiBSU3BlY1ZpZXdcbiAgICAgICAgcnNwZWNWaWV3LnJ1bihsaW5lTnVtYmVyKVxuICAgICAgICBwcmV2aW91c0FjdGl2ZVBhbmUuYWN0aXZhdGUoKVxuXG4gIHJ1bkZvckxpbmU6IC0+XG4gICAgY29uc29sZS5sb2cgXCJTdGFydGluZyBydW5Gb3JMaW5lLi4uXCJcbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICBjb25zb2xlLmxvZyBcIkVkaXRvclwiLCBlZGl0b3JcbiAgICByZXR1cm4gdW5sZXNzIGVkaXRvcj9cblxuICAgIGN1cnNvciA9IGVkaXRvci5nZXRMYXN0Q3Vyc29yKClcbiAgICBjb25zb2xlLmxvZyBcIkN1cnNvclwiLCBjdXJzb3JcbiAgICBsaW5lID0gY3Vyc29yLmdldEJ1ZmZlclJvdygpICsgMVxuICAgIGNvbnNvbGUubG9nIFwiTGluZVwiLCBsaW5lXG5cbiAgICBAb3BlblVyaUZvcihlZGl0b3IuZ2V0UGF0aCgpLCBsaW5lKVxuXG4gIHJ1bkxhc3Q6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAbGFzdEZpbGU/XG4gICAgQG9wZW5VcmlGb3IoQGxhc3RGaWxlLCBAbGFzdExpbmUpXG5cbiAgcnVuOiAtPlxuICAgIGNvbnNvbGUubG9nIFwiUlVOXCJcbiAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgICByZXR1cm4gdW5sZXNzIGVkaXRvcj9cblxuICAgIEBvcGVuVXJpRm9yKGVkaXRvci5nZXRQYXRoKCkpXG5cbiAgcnVuQWxsOiAtPlxuICAgIHByb2plY3QgPSBhdG9tLnByb2plY3RcbiAgICByZXR1cm4gdW5sZXNzIHByb2plY3Q/XG5cbiAgICBAb3BlblVyaUZvcihwcm9qZWN0LmdldFBhdGhzKClbMF0gK1xuICAgIFwiL1wiICsgYXRvbS5jb25maWcuZ2V0KFwicnNwZWMuc3BlY19kaXJlY3RvcnlcIiksIEBsYXN0TGluZSlcbiJdfQ==
