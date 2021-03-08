Ext.namespace('Util');
Util.Calendar = new (function () {
    this.cellRenderer = function(dValue, hValue, meta) {
        if (!Ext.isEmpty(hValue) && hValue === '7') {
            meta.style = "background-color:#ADD8E6;font-size: smaller;";
        } else if (!Ext.isEmpty(hValue)) {
            meta.style = "background-color:#FFB6C1;font-size: smaller;";
        } else {
            meta.style = "font-size: smaller;";
        }

        if (!Ext.isEmpty(hValue) && !(hValue === '7' || hValue === '1')) {
            meta.tdAttr = 'data-qtip="' + hValue + '"';
        }

        if (!Ext.isEmpty(dValue)) {
            return dValue;
        } else {
            return (hValue === '7' || hValue === '1') ? '' : hValue;
        }
    }
});

Util.String = new (function () {
    this.lpad = function (value, length, character) {
        value = '' + value; // Stringfy
        while (value.length < length) {
            value = character + value;
        }
        return value;
    };


    this.rpad = function (value, length, character) {
        value = '' + value; // Stringfy
        while (value.length < length) {
            value = value + character;
        }
        return value;
    };

    this.trim = function (string) {
        if (string == null)
            return null;

        var startingIndex = 0;
        var endingIndex = string.length - 1;

        var singleWhitespaceRegex = /\s/;
        while (string.substring(startingIndex, startingIndex + 1).match(singleWhitespaceRegex))
            startingIndex++;

        while (string.substring(endingIndex, endingIndex + 1).match(singleWhitespaceRegex))
            endingIndex--;

        if (endingIndex < startingIndex)
            return '';

        return string.substring(startingIndex, endingIndex + 1);
    };

    this.stripTags = function (str) {
        if (str == null) return '';
        return String(str).replace(/<\/?[^>]+>/g, '');
    };

    this.surround = function (str, wrapper) {
        return [wrapper, str, wrapper].join('');
    };

    this.quote = function (str) {
        return this.surround(str, '"');
    };

    this.strRepeat = function (str, qty) {
        if (qty < 1) return '';
        var result = '';
        while (qty > 0) {
            if (qty & 1) result += str;
            qty >>= 1, str += str;
        }
        return result;
    };

    /**
     * 문자열이 비어있는지 확인한다.
     */
    this.isBlank = function (string) {
        if (string == undefined || string == null) {
            return true;
        }
        return this.trim(string) == '';
    };

    /**
     * 문자열에서 나타난 문구를 모두 일괄 변환한다.
     */
    this.replaceAll = function (string, from, to) {
        var value = "";

        if (from == null) {
            return string;
        }

        if (string != "" && from != to) {
            value = string;

            while (value.indexOf(from) > -1) {
                value = value.replace(from, to);
            }
        }
        return value;
    };

    /**
     * HTML 태그를 escape 처리한다.
     */
    this.escapeHTML = function (self) {
        return self
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&apos;");
    };

    /**
     * Escape 처리한 HTML 태그를 복원한다.
     */
    this.unescapeHTML = function (self) {
        return self
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    };

    /**
     * 문자열이 지정한 문자열로 시작하는지 확인한다.
     */
    this.startsWith = function (self, start) {
        return self.length >= start.length && self.substring(0, start.length) === start;
    };

    /**
     * 문자열이 지정한 문자열로 끝나는지 확인한다.
     */
    this.endsWith = function (self, ends) {
        return self.length >= ends.length && self.substring(self.length - ends.length) === ends;
    };

    /**
     * 문자열 내에 지정한 문자열이 포함되는지 여부를 확인한다.
     */
    this.occurrence = function (self, substr) {
        return self.indexOf(substr) !== -1;
    };

    /**
     *
     */
    this.chop = function (self, step) {
        var result = [], len = self.length, i;

        step || (step = len);

        for (i = 0; i < len; i += step) {
            result.push(self.slice(i, i + step));
        }

        return result;
    };

    /**
     * @see http://jsfromhell.com/string/wordwrap
     */
    this.wrap = function (msg, m, b, c) {
        var i, j, l, s, r;
        if (m < 1)
            return msg;
        for (i = -1, l = (r = msg.split("\n")).length; ++i < l; r[i] += s)
            for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
                j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
                    || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        return r.join("\n");
    };

    /**
     *
     */
    this.capitalize = function (self) {
        return self.charAt(0).toUpperCase() + self.substring(1).toLowerCase();
    };

    /**
     *
     */
    this.chars = function (self) {
        return self.split('');
    };

    /**
     *
     */
    this.count = function (self, substr) {
        var result = 0, len = self.length, step = substr.length, index = 0, i;

        for (i = 0; i < len; i += index + step) {
            index = self.indexOf(substr, i);
            if (index < 0) {
                return result;
            }
            result += 1;
        }

        return result;
    };
});
