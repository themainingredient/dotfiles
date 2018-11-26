(function() {
  var $, $$$, ChildProcess, EditorView, RSpecView, ScrollView, TextFormatter, path, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-space-pen-views'), $ = ref.$, $$$ = ref.$$$, EditorView = ref.EditorView, ScrollView = ref.ScrollView;

  path = require('path');

  ChildProcess = require('child_process');

  TextFormatter = require('./text-formatter');

  RSpecView = (function(superClass) {
    extend(RSpecView, superClass);

    atom.deserializers.add(RSpecView);

    RSpecView.deserialize = function(arg) {
      var filePath;
      filePath = arg.filePath;
      return new RSpecView(filePath);
    };

    RSpecView.content = function() {
      return this.div({
        "class": 'rspec rspec-console',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'rspec-spinner'
          }, 'Starting RSpec...');
          return _this.pre({
            "class": 'rspec-output'
          });
        };
      })(this));
    };

    RSpecView.prototype.initialize = function() {
      var rspec;
      RSpecView.__super__.initialize.apply(this, arguments);
      rspec = this;
      return atom.commands.add('atom-workspace', {
        'core:copy': function(event) {
          return rspec.copySelectedText();
        }
      });
    };

    function RSpecView(filePath) {
      this.onClose = bind(this.onClose, this);
      this.onStdErr = bind(this.onStdErr, this);
      this.onStdOut = bind(this.onStdOut, this);
      this.addOutput = bind(this.addOutput, this);
      this.terminalClicked = bind(this.terminalClicked, this);
      RSpecView.__super__.constructor.apply(this, arguments);
      console.log("File path:", filePath);
      this.filePath = filePath;
      this.output = this.find(".rspec-output");
      this.spinner = this.find(".rspec-spinner");
      this.output.on("click", this.terminalClicked);
    }

    RSpecView.prototype.serialize = function() {
      return {
        deserializer: 'RSpecView',
        filePath: this.getPath()
      };
    };

    RSpecView.prototype.copySelectedText = function() {
      var text;
      text = window.getSelection().toString();
      if (text === '') {
        return;
      }
      return atom.clipboard.write(text);
    };

    RSpecView.prototype.getTitle = function() {
      return "RSpec - " + (path.basename(this.getPath()));
    };

    RSpecView.prototype.getURI = function() {
      return "rspec-output://" + (this.getPath());
    };

    RSpecView.prototype.getPath = function() {
      return this.filePath;
    };

    RSpecView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = "The error message";
      return this.html($$$(function() {
        this.h2('Running RSpec Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      }));
    };

    RSpecView.prototype.terminalClicked = function(e) {
      var file, line, promise, ref1;
      if ((ref1 = e.target) != null ? ref1.href : void 0) {
        line = $(e.target).data('line');
        file = $(e.target).data('file');
        console.log(file);
        file = (atom.project.getPaths()[0]) + "/" + file;
        promise = atom.workspace.open(file, {
          searchAllPanes: true,
          initialLine: line
        });
        return promise.then(function(editor) {
          return editor.setCursorBufferPosition([line - 1, 0]);
        });
      }
    };

    RSpecView.prototype.run = function(lineNumber) {
      var command, options, projectPath, spawn, specCommand, terminal;
      if (atom.config.get("rspec.save_before_run")) {
        atom.workspace.saveAll();
      }
      this.spinner.show();
      this.output.empty();
      projectPath = atom.project.getPaths()[0];
      spawn = ChildProcess.spawn;
      specCommand = atom.config.get("rspec.command");
      options = " --tty";
      if (atom.config.get("rspec.force_colored_results")) {
        options += " --color";
      }
      command = specCommand + " " + options + " " + this.filePath;
      if (lineNumber) {
        command = command + ":" + lineNumber;
      }
      console.log("[RSpec] running: " + command);
      terminal = spawn("bash", ["-l"]);
      terminal.on('close', this.onClose);
      terminal.stdout.on('data', this.onStdOut);
      terminal.stderr.on('data', this.onStdErr);
      terminal.stdin.write("cd " + projectPath + " && " + command + "\n");
      return terminal.stdin.write("exit\n");
    };

    RSpecView.prototype.addOutput = function(output) {
      var formatter;
      formatter = new TextFormatter(output);
      output = formatter.htmlEscaped().colorized().fileLinked().text;
      this.spinner.hide();
      this.output.append("" + output);
      return this.scrollTop(this[0].scrollHeight);
    };

    RSpecView.prototype.onStdOut = function(data) {
      return this.addOutput(data);
    };

    RSpecView.prototype.onStdErr = function(data) {
      return this.addOutput(data);
    };

    RSpecView.prototype.onClose = function(code) {
      return console.log("[RSpec] exit with code: " + code);
    };

    return RSpecView;

  })(ScrollView);

  module.exports = RSpecView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL211bmtpdXMvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9yc3BlYy9saWIvcnNwZWMtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGlGQUFBO0lBQUE7Ozs7RUFBQSxNQUFtQyxPQUFBLENBQVEsc0JBQVIsQ0FBbkMsRUFBQyxTQUFELEVBQUksYUFBSixFQUFTLDJCQUFULEVBQXFCOztFQUNyQixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ1AsWUFBQSxHQUFnQixPQUFBLENBQVEsZUFBUjs7RUFDaEIsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVI7O0VBRVY7OztJQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsU0FBdkI7O0lBRUEsU0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLEdBQUQ7QUFDWixVQUFBO01BRGMsV0FBRDthQUNiLElBQUksU0FBSixDQUFjLFFBQWQ7SUFEWTs7SUFHZCxTQUFDLENBQUEsT0FBRCxHQUFVLFNBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxxQkFBUDtRQUE4QixRQUFBLEVBQVUsQ0FBQyxDQUF6QztPQUFMLEVBQWlELENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUMvQyxLQUFDLENBQUEsR0FBRCxDQUFLO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxlQUFQO1dBQUwsRUFBNkIsbUJBQTdCO2lCQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLGNBQVA7V0FBTDtRQUYrQztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakQ7SUFEUTs7d0JBS1YsVUFBQSxHQUFZLFNBQUE7QUFDVixVQUFBO01BQUEsMkNBQUEsU0FBQTtNQUNBLEtBQUEsR0FBUTthQUNSLElBQUksQ0FBQyxRQUFRLENBQUMs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QUF4QixDQUFBLENBQW1DLENBQUMsVUFBcEMsQ0FBQSxDQUFnRCxDQUFDO01BRTFELElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFBO01BQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQWUsRUFBQSxHQUFHLE1BQWxCO2FBQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFFLENBQUEsQ0FBQSxDQUFFLENBQUMsWUFBaEI7SUFOUzs7d0JBUVgsUUFBQSxHQUFVLFNBQUMsSUFBRDthQUNSLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWDtJQURROzt3QkFHVixRQUFBLEdBQVUsU0FBQyxJQUFEO2FBQ1IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFYO0lBRFE7O3dCQUdWLE9BQUEsR0FBUyxTQUFDLElBQUQ7YUFDUCxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFBLEdBQTJCLElBQXZDO0lBRE87Ozs7S0F2R2E7O0VBMEd4QixNQUFNLENBQUMsT0FBUCxHQUFpQjtBQS9HakIiLCJzb3VyY2VzQ29udGVudCI6WyJ7JCwgJCQkLCBFZGl0b3JWaWV3LCBTY3JvbGxWaWV3fSA9IHJlcXVpcmUgJ2F0b20tc3BhY2UtcGVuLXZpZXdzJ1xucGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG5DaGlsZFByb2Nlc3MgID0gcmVxdWlyZSAnY2hpbGRfcHJvY2VzcydcblRleHRGb3JtYXR0ZXIgPSByZXF1aXJlICcuL3RleHQtZm9ybWF0dGVyJ1xuXG5jbGFzcyBSU3BlY1ZpZXcgZXh0ZW5kcyBTY3JvbGxWaWV3XG4gIGF0b20uZGVzZXJpYWxpemVycy5hZGQodGhpcylcblxuICBAZGVzZXJpYWxpemU6ICh7ZmlsZVBhdGh9KSAtPlxuICAgIG5ldyBSU3BlY1ZpZXcoZmlsZVBhdGgpXG5cbiAgQGNvbnRlbnQ6IC0+XG4gICAgQGRpdiBjbGFzczogJ3JzcGVjIHJzcGVjLWNvbnNvbGUnLCB0YWJpbmRleDogLTEsID0+XG4gICAgICBAZGl2IGNsYXNzOiAncnNwZWMtc3Bpbm5lcicsICdTdGFydGluZyBSU3BlYy4uLidcbiAgICAgIEBwcmUgY2xhc3M6ICdyc3BlYy1vdXRwdXQnXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBzdXBlclxuICAgIHJzcGVjID0gdGhpc1xuICAgIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsJ2NvcmU6Y29weSc6IChldmVudCkgLT5cbiAgICAgIHJzcGVjLmNvcHlTZWxlY3RlZFRleHQoKVxuXG4gIGNvbnN0cnVjdG9yOiAoZmlsZVBhdGgpIC0+XG4gICAgc3VwZXJcbiAgICBjb25zb2xlLmxvZyBcIkZpbGUgcGF0aDpcIiwgZmlsZVBhdGhcbiAgICBAZmlsZVBhdGggPSBmaWxlUGF0aFxuXG4gICAgQG91dHB1dCAgPSBAZmluZChcIi5yc3BlYy1vdXRwdXRcIilcbiAgICBAc3Bpbm5lciA9IEBmaW5kKFwiLnJzcGVjLXNwaW5uZXJcIilcbiAgICBAb3V0cHV0Lm9uKFwiY2xpY2tcIiwgQHRlcm1pbmFsQ2xpY2tlZClcblxuICBzZXJpYWxpemU6IC0+XG4gICAgZGVzZXJpYWxpemVyOiAnUlNwZWNWaWV3J1xuICAgIGZpbGVQYXRoOiBAZ2V0UGF0aCgpXG5cbiAgY29weVNlbGVjdGVkVGV4dDogLT5cbiAgICB0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKClcbiAgICByZXR1cm4gaWYgdGV4dCA9PSAnJ1xuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKHRleHQpXG5cbiAgZ2V0VGl0bGU6IC0+XG4gICAgXCJSU3BlYyAtICN7cGF0aC5iYXNlbmFtZShAZ2V0UGF0aCgpKX1cIlxuXG4gIGdldFVSSTogLT5cbiAgICBcInJzcGVjLW91dHB1dDovLyN7QGdldFBhdGgoKX1cIlxuXG4gIGdldFBhdGg6IC0+XG4gICAgQGZpbGVQYXRoXG5cbiAgc2hvd0Vycm9yOiAocmVzdWx0KSAtPlxuICAgIGZhaWx1cmVNZXNzYWdlID0gXCJUaGUgZXJyb3IgbWVzc2FnZVwiXG5cbiAgICBAaHRtbCAkJCQgLT5cbiAgICAgIEBoMiAnUnVubmluZyBSU3BlYyBGYWlsZWQnXG4gICAgICBAaDMgZmFpbHVyZU1lc3NhZ2UgaWYgZmFpbHVyZU1lc3NhZ2U/XG5cbiAgdGVybWluYWxDbGlja2VkOiAoZSkgPT5cbiAgICBpZiBlLnRhcmdldD8uaHJlZlxuICAgICAgbGluZSA9ICQoZS50YXJnZXQpLmRhdGEoJ2xpbmUnKVxuICAgICAgZmlsZSA9ICQoZS50YXJnZXQpLmRhdGEoJ2ZpbGUnKVxuICAgICAgY29uc29sZS5sb2coZmlsZSlcbiAgICAgIGZpbGUgPSBcIiN7YXRvbS5wcm9qZWN0LmdldFBhdGhzKClbMF19LyN7ZmlsZX1cIlxuXG4gICAgICBwcm9taXNlID0gYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlLCB7IHNlYXJjaEFsbFBhbmVzOiB0cnVlLCBpbml0aWFsTGluZTogbGluZSB9KVxuICAgICAgcHJvbWlzZS50aGVuIChlZGl0b3IpIC0+XG4gICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihbbGluZS0xLCAwXSlcblxuICBydW46IChsaW5lTnVtYmVyKSAtPlxuICAgIGF0b20ud29ya3NwYWNlLnNhdmVBbGwoKSBpZiBhdG9tLmNvbmZpZy5nZXQoXCJyc3BlYy5zYXZlX2JlZm9yZV9ydW5cIilcbiAgICBAc3Bpbm5lci5zaG93KClcbiAgICBAb3V0cHV0LmVtcHR5KClcbiAgICBwcm9qZWN0UGF0aCA9IGF0b20ucHJvamVjdC5nZXRQYXRocygpWzBdXG5cbiAgICBzcGF3biA9IENoaWxkUHJvY2Vzcy5zcGF3blxuXG4gICAgIyBBdG9tIHNhdmVzIGNvbmZpZyBiYXNlZCBvbiBwYWNrYWdlIG5hbWUsIHNvIHdlIG5lZWQgdG8gdXNlIHJzcGVjIGhlcmUuXG4gICAgc3BlY0NvbW1hbmQgPSBhdG9tLmNvbmZpZy5nZXQoXCJyc3BlYy5jb21tYW5kXCIpXG4gICAgb3B0aW9ucyA9IFwiIC0tdHR5XCJcbiAgICBvcHRpb25zICs9IFwiIC0tY29sb3JcIiBpZiBhdG9tLmNvbmZpZy5nZXQoXCJyc3BlYy5mb3JjZV9jb2xvcmVkX3Jlc3VsdHNcIilcbiAgICBjb21tYW5kID0gXCIje3NwZWNDb21tYW5kfSAje29wdGlvbnN9ICN7QGZpbGVQYXRofVwiXG4gICAgY29tbWFuZCA9IFwiI3tjb21tYW5kfToje2xpbmVOdW1iZXJ9XCIgaWYgbGluZU51bWJlclxuXG4gICAgY29uc29sZS5sb2cgXCJbUlNwZWNdIHJ1bm5pbmc6ICN7Y29tbWFuZH1cIlxuXG4gICAgdGVybWluYWwgPSBzcGF3bihcImJhc2hcIiwgW1wiLWxcIl0pXG5cbiAgICB0ZXJtaW5hbC5vbiAnY2xvc2UnLCBAb25DbG9zZVxuXG4gICAgdGVybWluYWwuc3Rkb3V0Lm9uICdkYXRhJywgQG9uU3RkT3V0XG4gICAgdGVybWluYWwuc3RkZXJyLm9uICdkYXRhJywgQG9uU3RkRXJyXG5cbiAgICB0ZXJtaW5hbC5zdGRpbi53cml0ZShcImNkICN7cHJvamVjdFBhdGh9ICYmICN7Y29tbWFuZH1cXG5cIilcbiAgICB0ZXJtaW5hbC5zdGRpbi53cml0ZShcImV4aXRcXG5cIilcblxuICBhZGRPdXRwdXQ6IChvdXRwdXQpID0+XG4gICAgZm9ybWF0dGVyID0gbmV3IFRleHRGb3JtYXR0ZXIob3V0cHV0KVxuICAgIG91dHB1dCA9IGZvcm1hdHRlci5odG1sRXNjYXBlZCgpLmNvbG9yaXplZCgpLmZpbGVMaW5rZWQoKS50ZXh0XG5cbiAgICBAc3Bpbm5lci5oaWRlKClcbiAgICBAb3V0cHV0LmFwcGVuZChcIiN7b3V0cHV0fVwiKVxuICAgIEBzY3JvbGxUb3AoQFswXS5zY3JvbGxIZWlnaHQpXG5cbiAgb25TdGRPdXQ6IChkYXRhKSA9PlxuICAgIEBhZGRPdXRwdXQgZGF0YVxuXG4gIG9uU3RkRXJyOiAoZGF0YSkgPT5cbiAgICBAYWRkT3V0cHV0IGRhdGFcblxuICBvbkNsb3NlOiAoY29kZSkgPT5cbiAgICBjb25zb2xlLmxvZyBcIltSU3BlY10gZXhpdCB3aXRoIGNvZGU6ICN7Y29kZX1cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IFJTcGVjVmlld1xuIl19
