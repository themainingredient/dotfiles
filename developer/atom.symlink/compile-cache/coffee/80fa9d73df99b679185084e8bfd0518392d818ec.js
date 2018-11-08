(function() {
  var $, $$$, EditorView, ScrollView, TextFormatter, ref;

  ref = require('atom-space-pen-views'), $ = ref.$, $$$ = ref.$$$, EditorView = ref.EditorView, ScrollView = ref.ScrollView;

  TextFormatter = (function() {
    function TextFormatter(text1) {
      this.text = text1;
    }

    TextFormatter.prototype.htmlEscaped = function() {
      return new TextFormatter($('<div/>').text(this.text).html());
    };

    TextFormatter.prototype.fileLinked = function() {
      var text;
      text = this.text.replace(/([\\\/.][^\s]*:[0-9]+)([^\d]|$)/g, (function(_this) {
        return function(match) {
          var file, fileAndLine, fileLineEnd, line, matchWithoutFileAndLine;
          file = match.split(":")[0];
          line = match.split(":")[1].replace(/[^\d]*$/, '');
          fileLineEnd = file.length + line.length;
          fileAndLine = file + ":" + line;
          matchWithoutFileAndLine = match.substr(fileLineEnd + 1);
          return ("<a href=\"" + file + "\" data-line=\"" + line + "\" data-file=\"" + file + "\">") + (fileAndLine + "</a>" + matchWithoutFileAndLine);
        };
      })(this));
      return new TextFormatter(text);
    };

    TextFormatter.prototype.colorized = function() {
      var colorEndCount, colorStartCount, i, j, ref1, ref2, ref3, replaceCount, text;
      text = this.text;
      colorStartCount = ((ref1 = text.match(/\[3[0-7]m/g)) != null ? ref1.length : void 0) || 0;
      colorEndCount = ((ref2 = text.match(/\[0m/g)) != null ? ref2.length : void 0) || 0;
      replaceCount = colorStartCount;
      if (colorEndCount < colorStartCount) {
        replaceCount = colorEndCount;
      }
      for (i = j = 0, ref3 = replaceCount; 0 <= ref3 ? j <= ref3 : j >= ref3; i = 0 <= ref3 ? ++j : --j) {
        text = text.replace(/\[(3[0-7])m/, (function(_this) {
          return function(match, colorCode) {
            return "<p class=\"rspec-color tty-" + colorCode + "\">";
          };
        })(this));
        text = text.replace(/\[0m/g, '</p>');
      }
      return new TextFormatter(text);
    };

    return TextFormatter;

  })();

  module.exports = TextFormatter;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL211bmtpdXMvLmRvdGZpbGVzL2F0b20uc3ltbGluay9wYWNrYWdlcy9yc3BlYy9saWIvdGV4dC1mb3JtYXR0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxNQUFtQyxPQUFBLENBQVEsc0JBQVIsQ0FBbkMsRUFBQyxTQUFELEVBQUksYUFBSixFQUFTLDJCQUFULEVBQXFCOztFQUVmO0lBQ1MsdUJBQUMsS0FBRDtNQUFDLElBQUMsQ0FBQSxPQUFEO0lBQUQ7OzRCQUViLFdBQUEsR0FBYSxTQUFBO2FBQ1gsSUFBSSxhQUFKLENBQW1CLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLElBQUMsQ0FBQSxJQUFsQixDQUF1QixDQUFDLElBQXhCLENBQUEsQ0FBbkI7SUFEVzs7NEJBR2IsVUFBQSxHQUFZLFNBQUE7QUFDVixVQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixDQUFjLGtDQUFkLEVBQWtELENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFEO0FBQ3ZELGNBQUE7VUFBQSxJQUFBLEdBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLENBQWlCLENBQUEsQ0FBQTtVQUN4QixJQUFBLEdBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLENBQWlCLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBcEIsQ0FBNEIsU0FBNUIsRUFBdUMsRUFBdkM7VUFFUCxXQUFBLEdBQWMsSUFBSSxDQUFDLE1BQUwsR0FBYyxJQUFJLENBQUM7VUFDakMsV0FBQSxHQUFpQixJQUFELEdBQU0sR0FBTixHQUFTO1VBQ3pCLHVCQUFBLEdBQTBCLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBQSxHQUFjLENBQTNCO2lCQUUxQixDQUFBLFlBQUEsR0FBYSxJQUFiLEdBQWtCLGlCQUFsQixHQUFtQyxJQUFuQyxHQUF3QyxpQkFBeEMsR0FBeUQsSUFBekQsR0FBOEQsS0FBOUQsQ0FBQSxHQUNBLENBQUcsV0FBRCxHQUFhLE1BQWIsR0FBbUIsdUJBQXJCO1FBVHVEO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRDthQVVQLElBQUksYUFBSixDQUFrQixJQUFsQjtJQVhVOzs0QkFhWixTQUFBLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBO01BRVIsZUFBQSxvREFBMEMsQ0FBRSxnQkFBMUIsSUFBb0M7TUFDdEQsYUFBQSwrQ0FBbUMsQ0FBRSxnQkFBckIsSUFBK0I7TUFHL0MsWUFBQSxHQUFlO01BQ2YsSUFBZ0MsYUFBQSxHQUFnQixlQUFoRDtRQUFBLFlBQUEsR0FBZSxjQUFmOztBQUVBLFdBQVMsNEZBQVQ7UUFDRSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQUwsQ0FBYSxhQUFiLEVBQTRCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUMsS0FBRCxFQUFRLFNBQVI7bUJBQ2pDLDZCQUFBLEdBQThCLFNBQTlCLEdBQXdDO1VBRFA7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCO1FBRVAsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QjtBQUhUO2FBS0EsSUFBSSxhQUFKLENBQWtCLElBQWxCO0lBZlM7Ozs7OztFQWlCYixNQUFNLENBQUMsT0FBUCxHQUFpQjtBQXRDakIiLCJzb3VyY2VzQ29udGVudCI6WyJ7JCwgJCQkLCBFZGl0b3JWaWV3LCBTY3JvbGxWaWV3fSA9IHJlcXVpcmUgJ2F0b20tc3BhY2UtcGVuLXZpZXdzJ1xuXG5jbGFzcyBUZXh0Rm9ybWF0dGVyXG4gIGNvbnN0cnVjdG9yOiAoQHRleHQpLT5cblxuICBodG1sRXNjYXBlZDogLT5cbiAgICBuZXcgVGV4dEZvcm1hdHRlciggJCgnPGRpdi8+JykudGV4dChAdGV4dCkuaHRtbCgpIClcblxuICBmaWxlTGlua2VkOiAtPlxuICAgIHRleHQgPSBAdGV4dC5yZXBsYWNlIC8oW1xcXFxcXC8uXVteXFxzXSo6WzAtOV0rKShbXlxcZF18JCkvZywgKG1hdGNoKSA9PlxuICAgICAgZmlsZSA9IG1hdGNoLnNwbGl0KFwiOlwiKVswXVxuICAgICAgbGluZSA9IG1hdGNoLnNwbGl0KFwiOlwiKVsxXS5yZXBsYWNlKC9bXlxcZF0qJC8sICcnKVxuXG4gICAgICBmaWxlTGluZUVuZCA9IGZpbGUubGVuZ3RoICsgbGluZS5sZW5ndGhcbiAgICAgIGZpbGVBbmRMaW5lID0gXCIje2ZpbGV9OiN7bGluZX1cIlxuICAgICAgbWF0Y2hXaXRob3V0RmlsZUFuZExpbmUgPSBtYXRjaC5zdWJzdHIoZmlsZUxpbmVFbmQgKyAxKVxuXG4gICAgICBcIjxhIGhyZWY9XFxcIiN7ZmlsZX1cXFwiIGRhdGEtbGluZT1cXFwiI3tsaW5lfVxcXCIgZGF0YS1maWxlPVxcXCIje2ZpbGV9XFxcIj5cIitcbiAgICAgIFwiI3tmaWxlQW5kTGluZX08L2E+I3ttYXRjaFdpdGhvdXRGaWxlQW5kTGluZX1cIlxuICAgIG5ldyBUZXh0Rm9ybWF0dGVyKHRleHQpXG5cbiAgY29sb3JpemVkOiAtPlxuICAgIHRleHQgPSBAdGV4dFxuXG4gICAgY29sb3JTdGFydENvdW50ID0gdGV4dC5tYXRjaCgvXFxbM1swLTddbS9nKT8ubGVuZ3RoIHx8IDBcbiAgICBjb2xvckVuZENvdW50ID0gdGV4dC5tYXRjaCgvXFxbMG0vZyk/Lmxlbmd0aCB8fCAwXG5cbiAgICAjIHRvIGF2b2lkIHVuY2xvc2VkIHRhZ3Mgd2UgYWx3YXlzIHVzZSBzbWFsbGVyIG51bWJlciBvZiBjb2xvciBzdGFydHMgLyBlbmRzXG4gICAgcmVwbGFjZUNvdW50ID0gY29sb3JTdGFydENvdW50XG4gICAgcmVwbGFjZUNvdW50ID0gY29sb3JFbmRDb3VudCBpZiBjb2xvckVuZENvdW50IDwgY29sb3JTdGFydENvdW50XG5cbiAgICBmb3IgaSBpbiBbMC4ucmVwbGFjZUNvdW50XVxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAvXFxbKDNbMC03XSltLywgKG1hdGNoLCBjb2xvckNvZGUpID0+XG4gICAgICAgIFwiPHAgY2xhc3M9XFxcInJzcGVjLWNvbG9yIHR0eS0je2NvbG9yQ29kZX1cXFwiPlwiXG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlIC9cXFswbS9nLCAnPC9wPidcblxuICAgIG5ldyBUZXh0Rm9ybWF0dGVyKHRleHQpXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEZvcm1hdHRlclxuIl19
